import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentClass } from "./studentClass.entity";
import { Repository } from "typeorm";
import { StudentClassDto } from "./studentClass.dto";
import { ClassroomService } from "../classroom/classroom.service";
import { TeacherService } from "../teacher/teacher.service";
import { plainToInstance } from "class-transformer";
import { StudentService } from "../student/student.service";
import { HomeworkService } from "../homework/homework.service";
import { QueryParamsDto } from "src/shared/dto";

@Injectable()
export class StudentClassService {
  constructor(
    @InjectRepository(StudentClass)
    private studentClassRepository: Repository<StudentClass>,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly classroomService: ClassroomService,
    private readonly homeworkService: HomeworkService
  ) {}

  async findByPk(id: number): Promise<StudentClass> {
    return await this.studentClassRepository.findOne({
      where: { id },
      relations: ["classroom", "student"],
    });
  }

  async getByClassroomId(classroomId: number): Promise<StudentClassDto[]> {
    try {
      const studentClasses = await this.studentClassRepository.find({
        where: { classroomId },
      });

      return plainToInstance(StudentClassDto, studentClasses);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSubmissionsByHomeworkId(
    userId: number,
    homeworkId: number,
    query: QueryParamsDto
  ): Promise<StudentClassDto[]> {
    try {
      const { page = 1, limit = 30 } = query;

      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const homework = await this.homeworkService.findByPk(homeworkId);
      if (!homework) {
        throw new NotFoundException("Homework not found");
      }

      const studentClasses = await this.studentClassRepository
        .createQueryBuilder("studentClass")
        .leftJoinAndSelect(
          "studentClass.homeworkSubmissions",
          "homework_submission",
          "homework_submission.homeworkId = :homeworkId",
          { homeworkId: homework.id }
        )
        .leftJoinAndSelect("homework_submission.files", "homework_submission_file")
        .where("studentClass.classroomId = :classroomId", { classroomId: homework.classroomId }) // Fixed missing prefix
        .take(limit)
        .skip((page - 1) * limit)
        .getMany();

      return plainToInstance(StudentClassDto, studentClasses);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async identify(userId: number, studentClassId: number): Promise<StudentClassDto> {
    try {
      const student = await this.studentService.findOneByUserId(userId);
      if (!student) {
        throw new NotFoundException("Student not found");
      }

      const studentClass = await this.studentClassRepository.findOne({
        where: { id: studentClassId },
      });
      if (!studentClass) {
        throw new NotFoundException("Student not found");
      }

      if (studentClass.student) {
        throw new UnauthorizedException("");
      }

      studentClass.student = student;
      studentClass.confirmedAt = new Date();

      const newStudentClass = await this.studentClassRepository.save(studentClass);

      return plainToInstance(StudentClassDto, newStudentClass);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(userId: number, studentClassDto: StudentClassDto): Promise<StudentClassDto> {
    const { classroomId, identificationNumber, fullname, phone, email, DOB, gender } = studentClassDto;

    const teacher = await this.teacherService.findOne({ userId });
    if (!teacher) {
      throw new NotFoundException("This teach not found");
    }

    const classroom = await this.classroomService.findByPk(studentClassDto.classroomId);
    if (!classroom) {
      throw new NotFoundException("This classroom not found");
    }

    if (classroom.teacherId !== teacher.id) {
      throw new UnauthorizedException();
    }

    const newStudentClass = this.studentClassRepository.create({
      fullname,
      phone,
      email,
      DOB,
      gender,
      classroom,
      identificationNumber,
    });

    try {
      const savedStudentClass = await this.studentClassRepository.save(newStudentClass);

      return plainToInstance(StudentClassDto, savedStudentClass);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createAnonymous(fullname: string): Promise<StudentClassDto> {
    try {
      const newStudentClass = this.studentClassRepository.create({
        fullname,
        identificationNumber: "000001",
        classroomId: -1,
      });

      const savedStudentClass = await this.studentClassRepository.save(newStudentClass);

      return plainToInstance(StudentClassDto, savedStudentClass);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
