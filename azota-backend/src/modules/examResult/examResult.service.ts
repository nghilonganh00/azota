import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamResult } from "./examResult.entity";
import { Repository } from "typeorm";
import { ExamResultDto } from "./dtos/examResult.dto";
import { StudentService } from "../student/student.service";
import { CreateExamResultDto } from "./dtos/create-examResult.dto";
import { Exam } from "../exam/exam.entity";
import { plainToInstance } from "class-transformer";
import { ExamAssignType } from "src/shared/constant";
import { MarkExamResultDto } from "./dtos/mark-examResult.dto";
import { ExamResultAnswerDto } from "./dtos/examResultAnswer.dto";
import { QueryParamsDto } from "src/shared/dto";
import { TeacherService } from "../teacher/teacher.service";
import { ExamResultUtilService } from "./examResultUtil.service";
import { Classroom } from "../classroom/classroom.entity";
import { Student } from "../student/student.entity";
import { PreviewExamDto } from "../exam/dtos/preview-exam.dto";
import { PreviewExamResultDto } from "./dtos/preview-examResult.dto";

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepository: Repository<ExamResult>,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    private readonly examResultUtilService: ExamResultUtilService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService
  ) {}

  async getById(userId: number, examResultId: number): Promise<ExamResultDto> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new UnauthorizedException("Teacher not found");
      }

      const examResult = await this.examResultRepository.findOne({
        where: { id: examResultId },
        // relations: ['']
      });

      return plainToInstance(ExamResultDto, examResult);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getHistory(userId: number, examId: number, studentId: number): Promise<PreviewExamResultDto[]> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new UnauthorizedException("Teacher not found");
      }

      const exam = await this.examRepository.findOne({
        where: { id: examId },
        relations: ["questionParts", "questionParts.questions", "questionParts.questions.options"],
      });
      if (!exam) {
        throw new NotFoundException("Exam not found");
      }
      if (exam.teacherId !== teacher.id) {
        throw new ForbiddenException();
      }

      const examResults = await this.examResultRepository.find({
        where: { examId, studentId },
      });

      const markedxamResults = examResults.map((examResult) => {
        const { score, correctQuestionIds, questionTotal } = this.examResultUtilService.calculateScore(
          examResult,
          exam
        );
        const correctTotal = correctQuestionIds.length;
        return {
          ...examResult,
          score,
          correctTotal,
          questionTotal,
        };
      });

      return plainToInstance(PreviewExamResultDto, markedxamResults);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getScore(userId: number, examResultId: number): Promise<MarkExamResultDto> {
    try {
      const student = await this.studentService.findOneByUserId(userId);
      if (!student) {
        throw new NotFoundException("Student not found");
      }

      const examResult = await this.examResultRepository.findOne({
        where: { id: examResultId },
        relations: ["exam", "student", "student.user"],
      });
      if (!examResult) {
        throw new NotFoundException("Exam Result not found");
      }
      if (examResult.studentId !== student.id) {
        throw new UnauthorizedException("Student unauthorized for this exam result");
      }

      const exam = await this.examRepository.findOne({
        where: { id: examResult.examId },
        relations: ["questionParts", "questionParts.questions", "questionParts.questions.options"],
      });
      if (!exam) {
        throw new NotFoundException("Exam not found");
      }

      const { score, correctQuestionIds, questionTotal } = this.examResultUtilService.calculateScore(examResult, exam);
      const correctTotal = correctQuestionIds.length;

      return plainToInstance(MarkExamResultDto, {
        ...examResult,
        score,
        correctTotal,
        correctQuestionIds,
        questionTotal,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getLatestOfStudentByExamAndClass(
    userId: number,
    examId: number,
    classroomId: number = -1,
    queryParamsDto: QueryParamsDto
  ): Promise<MarkExamResultDto[]> {
    try {
      const { page = 1, limit = 30, sortField = "createdAt", sortOrder = "ASC" } = queryParamsDto;

      const teacher = await this.teacherService.findOne({ userId });

      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const exam = await this.examRepository.findOne({
        where: { id: examId },
        relations: ["questionParts", "questionParts.questions", "questionParts.questions.options", "examClasses"],
      });

      if (exam.teacherId !== teacher.id) {
        throw new UnauthorizedException("Teacher unauthorized for this exam");
      }

      const subQuery = this.examResultRepository
        .createQueryBuilder("subExamResult")
        .select("MAX(subExamResult.id)", "maxId")
        .where("subExamResult.examId = :examId", { examId: exam.id })
        .groupBy("subExamResult.studentId");

      let examResults;

      if (classroomId === -1) {
        examResults = await this.examResultRepository
          .createQueryBuilder("examResult")
          .innerJoinAndSelect("examResult.student", "student")
          .leftJoinAndSelect("student.user", "user")
          .where(`examResult.id IN (${subQuery.getQuery()})`)
          .setParameters(subQuery.getParameters())
          .skip((page - 1) * limit)
          .take(limit)
          .orderBy(`examResult.${sortField}`, sortOrder.toUpperCase() as "ASC" | "DESC")
          .getMany();
      } else {
        examResults = await this.examResultRepository
          .createQueryBuilder("examResult")
          .innerJoinAndSelect("examResult.student", "student")
          .innerJoin("student.studentClasses", "studentClass")
          .leftJoinAndSelect("student.user", "user")
          .where(`examResult.id IN (${subQuery.getQuery()})`)
          .andWhere("studentClass.classroom = :classroomId", { classroomId: classroomId })
          .setParameters(subQuery.getParameters())
          .skip((page - 1) * limit)
          .take(limit)
          .orderBy(`examResult.${sortField}`, sortOrder.toUpperCase() as "ASC" | "DESC")
          .getMany();
      }

      const examResultMarks = [];
      examResults.forEach((examResult) => {
        const { score, correctQuestionIds, questionTotal } = this.examResultUtilService.calculateScore(
          examResult,
          exam
        );
        const correctTotal = correctQuestionIds.length;
        examResultMarks.push({ ...examResult, score, correctTotal, questionTotal });
      });

      return plainToInstance(MarkExamResultDto, examResultMarks);
    } catch (error) {
      throw error;
    }
  }

  async create(userId: number, createExamResultDto: CreateExamResultDto): Promise<ExamResultDto> {
    try {
      const { hashId, answer, startedAt } = createExamResultDto;
      const savedAt = new Date();

      const student = await this.studentService.findOneByUserId(userId);
      if (!student) {
        throw new NotFoundException("Student not found");
      }

      const exam = await this.examRepository.findOne({
        where: { hashId },
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

      const isAssignedStudent: boolean = exam.examStudents.some((examStudent) => examStudent.id === student.id);
      const isAssignedClass: boolean = exam.examClasses.some((examClass) =>
        examClass.classroom.studentClasses.some((studentClass) => studentClass.id === student.id)
      );

      if (
        exam.assignType === ExamAssignType.ALL ||
        (exam.assignType === ExamAssignType.CLASS && isAssignedClass) ||
        (exam.assignType === ExamAssignType.STUDENT && isAssignedStudent)
      ) {
        const newExamResult = this.examResultRepository.create({
          answer,
          startedAt,
          savedAt: savedAt,
          exam,
          student,
        });

        const savedExamResult = await this.examResultRepository.save(newExamResult);

        return plainToInstance(ExamResultDto, savedExamResult);
      } else {
        throw new UnauthorizedException("You not assigned for this exam");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
