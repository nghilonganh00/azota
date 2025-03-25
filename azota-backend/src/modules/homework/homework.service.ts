import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, FindManyOptions, Like, QueryRunner, Repository } from "typeorm";
import { TeacherService } from "../teacher/teacher.service";
import { plainToInstance } from "class-transformer";
import { ClassroomService } from "../classroom/classroom.service";
import { QueryParamsDto } from "src/shared/dto";
import { Homework } from "./homework.entity";
import { createHomeworkResDto, HomeworkDto } from "./dto/homework.dto";
import { UpdateHomeworkReq } from "./dto/updateHomework.dto";
import { HomeworkSubmissionService } from "../homeworkSubmission/homeworkSubmission.service";
import { Classroom } from "../classroom/classroom.entity";
import { NotificationService } from "../notification/notification.service";
import { Notification } from "../notification/notification.schema";
import { HomeworkNotification } from "src/shared/constant";

@Injectable()
export class HomeworkService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,

    private readonly teacherService: TeacherService,
    private readonly homeworkSubmissionService: HomeworkSubmissionService,
    private readonly notificationService: NotificationService
  ) {}

  async findByPk(id: number): Promise<Homework | null> {
    const homework = await this.homeworkRepository.findOneBy({ id });
    return homework;
  }

  async findOne(homeworkId: number): Promise<Homework> {
    try {
      const homework = await this.homeworkRepository.findOne({
        where: { id: homeworkId },
        relations: ["classroom", "homeworkFiles"],
      });

      return homework;
    } catch (error) {
      console.error("Error fetching homework data:", error);
      throw new InternalServerErrorException(`Failed to find all homework data: ${error.message}`);
    }
  }

  async findByHashId(hashId: string): Promise<HomeworkDto> {
    try {
      const homework = await this.homeworkRepository.findOne({
        where: { hashId },
        relations: ["classroom", "classroom.classgroup"],
      });

      return plainToInstance(HomeworkDto, homework);
    } catch (error) {
      console.error("Error fetching homework by hashId data:", error);
      throw new InternalServerErrorException(`Failed to find homework by hashId data: ${error.message}`);
    }
  }

  async getLastestByClassroomId(classroomId: number, limit: number): Promise<Homework[]> {
    const latestHomeworks = await this.homeworkRepository
      .createQueryBuilder("homework")
      .where("homework.classroomId = :classroomId", { classroomId: classroomId })
      .orderBy("homework.createdAt", "DESC")
      .take(limit)
      .getMany();

    return latestHomeworks;
  }

  async findAll(userId: number, query: QueryParamsDto): Promise<HomeworkDto[]> {
    try {
      const { page = 1, limit = 30, searchField, searchKeyword, sortField = "createdAt", sortOrder = "ASC" } = query;

      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const queryOptions: FindManyOptions = {
        where: {
          teacherId: teacher.id,
          ...(searchField && searchKeyword && { [searchField]: Like(`%${searchKeyword}%`) }),
        },
        skip: (page - 1) * limit,
        take: limit,
        order: sortField && sortOrder ? { [sortField]: sortOrder } : undefined,
      };

      console.log("Query Options:", queryOptions);

      const homeworks = await this.homeworkRepository.find(queryOptions);
      console.log(`homeworks ${homeworks}`);

      return plainToInstance(HomeworkDto, homeworks);
    } catch (error) {
      console.error("Error fetching homework data:", error);
      throw new InternalServerErrorException(`Failed to find all homework data: ${error.message}`);
    }
  }

  async create(userId: number, homeworkDto: HomeworkDto): Promise<createHomeworkResDto[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { homeworkFiles, classroomIds } = homeworkDto;

      const teacher = await this.teacherService.getDetailByUserId(userId);
      if (!teacher) {
        throw new UnauthorizedException("Teacher not found");
      }

      const newHomeworks = await Promise.all(
        classroomIds.map(async (classroomId) => {
          const classroom = await this.classroomRepository.findOne({
            where: { id: classroomId },
            relations: ["studentClasses"],
          });

          if (!classroom) {
            throw new NotFoundException(`Classroom with id: ${classroomId} not found`);
          }

          const newHomework = this.homeworkRepository.create({
            ...homeworkDto,
            teacher,
            classroom,
          });
          const savedHomework = await this.homeworkRepository.save(newHomework);

          //Create the homework submission for each assigned student
          await Promise.all(
            classroom.studentClasses.map(async (studentClass) => {
              const newHomeworkSubmission = await this.homeworkSubmissionService.create(
                newHomework.id,
                studentClass.id
              );
            })
          );

          // Send a notification to each assigned student about the new exam
          for (const studentClass of classroom.studentClasses) {
            if (studentClass?.studentId) {
              const notificationData: Notification = {
                userId: studentClass.studentId,
                senderId: teacher.user.id,
                senderName: teacher.user.fullname,
                senderAvatar: teacher.user.avatarURL,
                type: HomeworkNotification.NEW_HOMEWORK,
                title: `${teacher.user.fullname}`,
                message: `Đã được tạo bài thi ${savedHomework.title}`,
                extraData: {
                  homeworkId: savedHomework.id,
                  homeworkTitle: savedHomework.title,
                  startDate: savedHomework.startDate,
                  endDate: savedHomework.endDate,
                  classroomId: savedHomework.classroom.id,
                  classroomName: savedHomework.classroom.className,
                },
              };
              this.notificationService.sendNotification(notificationData);
            }
          }

          return savedHomework;
        })
      );

      return plainToInstance(createHomeworkResDto, newHomeworks);
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(userId: number, homeworkId: number, homeworkDto: UpdateHomeworkReq): Promise<HomeworkDto> {
    const { title, startDate, endDate, isMustLogin, isShowResult } = homeworkDto;

    const teacher = await this.teacherService.findOne({ userId });
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }

    const existHomework = await this.homeworkRepository.findOne({
      where: {
        id: homeworkId,
        teacherId: teacher.id,
      },
    });

    const newHomework = {
      ...existHomework,
      title,
      startDate,
      endDate,
      isMustLogin,
      isShowResult,
    };

    const updatedHomework = await this.homeworkRepository.save(newHomework);
    return plainToInstance(HomeworkDto, updatedHomework);
  }

  async updateContent(userId: number, homeworkId: number, updatedContent: string): Promise<HomeworkDto> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const homework = await this.homeworkRepository.findOne({
        where: { id: homeworkId },
      });
      if (!homework) {
        throw new NotFoundException("Homework not found");
      }
      if (homework.teacherId !== teacher.id) {
        throw new UnauthorizedException("You not authorized for this homework");
      }

      const updatedHomework = {
        ...homework,
        content: updatedContent,
      };

      const savedHomework = await this.homeworkRepository.save(updatedHomework);

      return plainToInstance(HomeworkDto, savedHomework);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(userId: number, homeworkId: number): Promise<void> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const homework = await this.homeworkRepository.findOne({
        where: { id: homeworkId },
      });

      if (!homework) {
        throw new NotFoundException("Homework not found");
      }

      if (homework.teacherId !== teacher.id) {
        throw new UnauthorizedException("You not authorized for this homework");
      }

      await this.homeworkRepository.softRemove(homework);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
