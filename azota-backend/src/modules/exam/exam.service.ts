import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Exam } from "./exam.entity";
import { DataSource, In, Not, QueryRunner, Repository } from "typeorm";
import { ExamDto } from "./dtos/exam.dto";
import { CreateExamDto } from "./dtos/create-exam.dto";
import { TeacherService } from "../teacher/teacher.service";
import { plainToInstance } from "class-transformer";
import { QueryParamsDto } from "src/shared/dto";
import { QuestionService } from "../question/question.service";
import { QuestionPartService } from "../questionPart/questionPart.service";
import { Question } from "../question/question.entity";
import { Option } from "../option/option.entity";
import { OptionService } from "../option/option.service";
import { ExamContentDto } from "./dtos/examContent.dto";
import { PublishExamDto } from "./dtos/publish-exam.dto";
import { PreviewExamDto } from "./dtos/preview-exam.dto";
import { StudentService } from "../student/student.service";
import { ExamAssignType } from "src/shared/constant";
import { GetExamContentByHashIdDto } from "./dtos/get-examContentByHashId";
import { CryptoUtil } from "src/common/utils/crypto.util";
import { ClassroomService } from "../classroom/classroom.service";
import { ExamClass } from "../examClass/examClass.entity";
import { ExamStudent } from "../examStudent/examStudent.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";

@Injectable()
export class ExamService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
    private readonly questionPartService: QuestionPartService,
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
    private readonly classroomService: ClassroomService
  ) {}

  async getConfig(userId: number, examId: number): Promise<ExamDto> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const exam = await this.examRepository.findOne({
        where: { id: examId, teacherId: teacher.id },
        relations: [
          "examClasses",
          "examClasses.classroom",
          "examStudents",
          "examStudents.studentClass",
          "teacher",
          "teacher.user",
        ],
      });

      return plainToInstance(ExamDto, exam);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getContent(userId: number, examId: number): Promise<ExamDto> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const exam = await this.examRepository
        .createQueryBuilder("exam")
        .leftJoinAndSelect("exam.questionParts", "questionParts")
        .leftJoinAndSelect("questionParts.questions", "questions")
        .leftJoinAndSelect("questions.options", "options")
        .where("exam.id = :examId AND exam.teacherId = :teacherId", { examId, teacherId: teacher.id })
        .orderBy("questionParts.rawIndex", "ASC")
        .addOrderBy("questions.rawIndex", "ASC")
        .addOrderBy("options.key", "ASC")
        .getOne();

      return plainToInstance(ExamDto, exam);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getContentByHashId(userId: number, hashId: string): Promise<GetExamContentByHashIdDto> {
    try {
      const student = await this.studentService.findOneByUserId(userId);
      if (!student) {
        throw new NotFoundException("Student not found");
      }

      console.log("hashId: ", hashId);

      const exam = await this.examRepository.findOne({
        where: {
          hashId: hashId,
        },
        relations: [
          "examStudents",
          "examClasses.classroom.studentClasses",
          "questionParts",
          "questionParts.questions",
          "questionParts.questions.options",
        ],
      });
      if (!exam) {
        throw new NotFoundException("Exam not found");
      }

      const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "AZOTA-19012003-EXAM-KEY";

      exam.questionParts.forEach((questionPart) => {
        questionPart.questions.forEach((question) => {
          question.topic = CryptoUtil.encrypt(ENCRYPTION_KEY, question.topic);

          question.options.forEach((option) => {
            option.content = CryptoUtil.encrypt(ENCRYPTION_KEY, option.content);
          });
        });
      });

      if (exam.assignType === ExamAssignType.ALL) {
        return plainToInstance(GetExamContentByHashIdDto, exam);
      }

      const isAssignedStudent: boolean = exam.examStudents.some((examStudent) => examStudent.id === student.id);
      const isAssignedClass: boolean = exam.examClasses.some((examClass) =>
        examClass.classroom.studentClasses.some((studentClass) => studentClass.id === student.id)
      );

      if (
        (exam.assignType === ExamAssignType.CLASS && isAssignedClass) ||
        (exam.assignType === ExamAssignType.STUDENT && isAssignedStudent)
      ) {
        return plainToInstance(GetExamContentByHashIdDto, exam);
      } else {
        throw new UnauthorizedException("You not assigned for this exam");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPreviews(userId: number, queryParams: QueryParamsDto): Promise<ExamDto[]> {
    try {
      const { page = 1, limit = 20, sortField = "createdAt", sortOrder = "DESC" } = queryParams;

      const safeLimit = Math.min(limit, 20);
      const offset = (page - 1) * safeLimit;

      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const examPreviews = await this.examRepository
        .createQueryBuilder("exam")
        .leftJoinAndSelect("exam.examResults", "examResult")
        .leftJoinAndSelect("exam.examClasses", "examClass")
        .leftJoinAndSelect("exam.examStudents", "examStudent")
        .leftJoinAndSelect("examStudent.studentClass", "studentClass")
        .leftJoinAndSelect("studentClass.classroom", "classroom")
        .where("exam.teacherId = :teacherId", { teacherId: teacher.id })
        .skip(offset)
        .take(safeLimit)
        .orderBy(`exam.${sortField}`, sortOrder.toUpperCase() as "ASC" | "DESC")
        .getMany();

      return plainToInstance(ExamDto, examPreviews);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async previewByHashId(hashId: string): Promise<PreviewExamDto> {
    try {
      const exam = await this.examRepository.findOne({
        where: { hashId },
        relations: ["examResults", "questionParts", "questionParts.questions"],
      });

      const questionTotal = exam.questionParts.reduce((acc, item) => acc + item.questions.length, 0);
      exam["questionTotal"] = questionTotal;
      exam["examResultTotal"] = exam.examResults.length;

      return plainToInstance(PreviewExamDto, exam);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(userId: number, createExamDto: CreateExamDto): Promise<ExamDto> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const { content } = createExamDto;

      const scoreTotal = 10;
      const questionTotal = Object.values(content).reduce((acc, part) => {
        return acc + Object.values(part.questions).length;
      }, 0);

      const scorePerQuestion = scoreTotal / questionTotal;

      const newExam = this.examRepository.create({
        ...createExamDto,
        teacher: teacher,
      });

      const savedExam = await this.examRepository.save(newExam);

      await Promise.all(
        Object.keys(content).map(async (questionPartKey) => {
          const part = content[questionPartKey];
          const questions = part["questions"];
          const newQuestionPart = await this.questionPartService.create({ ...part, exam: savedExam });

          await Promise.all(
            Object.values(questions).map(async (question: Question) => {
              const options = question.options;

              const newQuestion = await this.questionService.create({
                ...question,
                scorePerQuestion: question?.scorePerQuestion || scorePerQuestion,
                questionPart: newQuestionPart,
              });
              await Promise.all(
                Object.values(options).map(async (option: Option) => {
                  const newOption = await this.optionService.create({ ...option, question: newQuestion });
                })
              );
            })
          );
        })
      );

      return plainToInstance(ExamDto, newExam);
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async publish(userId: number, examId: number, publishExam: PublishExamDto): Promise<ExamDto> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const exam = await this.examRepository.findOne({
        where: { id: examId, teacherId: teacher.id },
        relations: ["examClasses", "examStudents"],
      });

      if (!exam) {
        throw new NotFoundException("Exam not found");
      }

      // Update exam properties
      const updatedExam = this.examRepository.create({
        ...exam,
        ...publishExam,
        isPublish: true,
      });

      console.log("updated exam: ", publishExam);

      // Handle assigned classes
      if (publishExam.assignedClassIds.length > 0) {
        const assignedClassIds = publishExam.assignedClassIds;
        const assignedClass = await this.classroomService.findByIds(assignedClassIds);

        if (assignedClass.length !== assignedClassIds.length) {
          throw new NotFoundException("Classroom not found");
        }

        // Remove existing exam classes
        if (exam.examClasses && exam.examClasses.length > 0) {
          await queryRunner.manager.remove(exam.examClasses);
        }

        // Create new exam classes
        const examClasses = assignedClass.map((classroom) => {
          return queryRunner.manager.create(ExamClass, {
            exam: exam,
            classroom: classroom,
          });
        });

        console.log("examClasses: ", examClasses);

        await queryRunner.manager.save(examClasses);
      }

      // Handle assigned students (similar pattern)
      if (publishExam.assignedStudentIds.length > 0) {
        const assignedStudentIds = publishExam.assignedStudentIds;
        const assignedStudent = await this.studentService.findByIds(assignedStudentIds);

        if (assignedStudent.length !== assignedStudentIds.length) {
          throw new NotFoundException("Student not found");
        }

        // Remove existing exam students
        if (exam.examStudents && exam.examStudents.length > 0) {
          await queryRunner.manager.remove(exam.examStudents);
        }

        // Get student classes for the assigned students
        const studentClasses = await queryRunner.manager.find(StudentClass, {
          where: { studentId: In(assignedStudentIds) },
        });

        // Create new exam students
        const examStudents = studentClasses.map((studentClass) => {
          return queryRunner.manager.create(ExamStudent, {
            exam: exam,
            studentClass: studentClass,
          });
        });

        await queryRunner.manager.save(examStudents);
      }

      const savedExam = await queryRunner.manager.save(updatedExam);
      await queryRunner.commitTransaction();

      return plainToInstance(ExamDto, savedExam);
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(userId: number, examId: number): Promise<void> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const exam = await this.examRepository.findOne({ where: { id: examId } });
      if (!exam) {
        throw new NotFoundException("Exam not found");
      }

      if (exam.teacherId !== teacher.id) {
        throw new UnauthorizedException("You unauthorized for this exam");
      }

      await this.examRepository.softRemove(exam);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
