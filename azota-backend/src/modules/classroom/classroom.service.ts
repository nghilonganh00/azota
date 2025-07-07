import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Classroom } from "./classroom.entity";
import { FindManyOptions, In, Like, Repository } from "typeorm";
import { TeacherService } from "../teacher/teacher.service";
import { plainToInstance } from "class-transformer";
import { ClassgroupsService } from "../classgroup/classgroup.service";
import { ClassroomDto } from "./dto/classroom.dto";
import { QueryParamsDto } from "src/shared/dto";
import { ClassroomWithHomeworksDto } from "./dto/classroomIncludeHomework.dto";
import { Homework } from "../homework/homework.entity";
import { HomeworkService } from "../homework/homework.service";

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,

    private readonly teacherService: TeacherService,
    private readonly classgroupService: ClassgroupsService,
    private readonly homeworkService: HomeworkService
  ) {}

  async findByIds(ids: number[]): Promise<Classroom[]> {
    return this.classroomRepository.find({ where: { id: In(ids) } });
  }

  async findByPk(id: number): Promise<Classroom | null> {
    const classroom = await this.classroomRepository.findOneBy({ id });

    return classroom;
  }

  async getStudentsById(id: number): Promise<ClassroomDto> {
    const classroom = await this.classroomRepository.findOne({
      where: { id },
      relations: ["studentClasses"],
    });

    if (!classroom) {
      throw new NotFoundException("Classroom not found of you not authorized");
    }

    return plainToInstance(ClassroomDto, classroom);
  }

  async getDetailStudentsByClassroomId(
    userId: number,
    classroomId: number,
    page: number = 0,
    limit: number = 30
  ): Promise<ClassroomDto> {
    const teacher = await this.teacherService.findOne({ userId });
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }

    const classroom = await this.classroomRepository.findOne({
      where: { id: classroomId, teacher: { id: teacher.id } },
      relations: [
        "studentClasses",
        "studentClasses.student",
        "studentClasses.student.user",
        "studentClasses.homeworkSubmissions",
        "studentClasses.examStudents",
      ],
    });

    if (!classroom) {
      throw new NotFoundException("Classroom not found of you not authorized");
    }

    return plainToInstance(ClassroomDto, classroom);
  }

  async getHomeworks(userId: number, query: QueryParamsDto): Promise<ClassroomWithHomeworksDto[]> {
    try {
      const { page = 1, limit = 30, searchField, searchKeyword, sortField = "createdAt", sortOrder = "ASC" } = query;

      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const classrooms = await this.classroomRepository
        .createQueryBuilder("classroom")
        .leftJoinAndSelect("classroom.homeworks", "homework")
        .where("classroom.teacherId = :teacherId", { teacherId: teacher.id })
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy(`classroom.${sortField}`, sortOrder.toUpperCase() as "ASC" | "DESC")
        .getMany();

      for (let classroom of classrooms) {
        const latestHomeworks = await this.homeworkService.getLastestByClassroomId(classroom.id, 5);
        classroom.homeworks = latestHomeworks;
      }

      return plainToInstance(ClassroomWithHomeworksDto, classrooms);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(userId: number, classroomDto: ClassroomDto): Promise<ClassroomDto> {
    const { className, classYear, classgroupId } = classroomDto;

    const teacher = await this.teacherService.findOne({ userId });
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }

    const classgroup = await this.classgroupService.findOne(classgroupId);
    if (!classgroup) {
      throw new NotFoundException("Classgroup not found");
    }

    try {
      const newClassroom = this.classroomRepository.create({
        className,
        classgroup,
        teacher,
      });

      const savedClassroom = await this.classroomRepository.save(newClassroom);

      return plainToInstance(ClassroomDto, savedClassroom);
    } catch (error) {
      throw new BadRequestException("Failed to create the classroom. Please try again.");
    }
  }
}
