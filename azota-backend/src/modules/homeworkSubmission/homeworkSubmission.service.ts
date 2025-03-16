import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { HomeworkSubmission } from "./homeworkSubmission.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";
import { Homework } from "../homework/homework.entity";
import { SubmitReqDto } from "./dto/submit-homeworkFile.dto";
import { HomeworkSubmissionDto } from "./dto/homeworkSubmission.dto";
import { HomeworkSubmissionFileService } from "../homeworkSubmissionFile/homeworkSubmissionFile.service";
import { HomeworkSubmissionFile } from "../homeworkSubmissionFile/homeworkSubmissionFile.entity";
import { TeacherService } from "../teacher/teacher.service";
import { MarkHomeworkSubmissionDto } from "./dto/mark-homeworkSubmission.dto";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class HomeworkSubmissionService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private homeworkSubmissionReposity: Repository<HomeworkSubmission>,
    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    @InjectRepository(StudentClass)
    private studentClassRepository: Repository<StudentClass>,

    private readonly teacherService: TeacherService,
    private readonly homeworkSubmissionFileService: HomeworkSubmissionFileService,
    private readonly notificationService: NotificationService
  ) {}

  async findOne(userId: number, homeworkSubmissionId: number): Promise<HomeworkSubmissionDto> {
    try {
      const homeworkSubmission = await this.homeworkSubmissionReposity.findOne({
        where: {
          id: homeworkSubmissionId,
        },
        relations: ["homework", "studentClass", "studentClass.student", "homework.classroom", "files"],
      });

      if (!homeworkSubmission) {
        throw new NotFoundException("Homework submission not found");
      }

      if (homeworkSubmission.homework.isMustLogin) {
        if (homeworkSubmission.studentClass.student.userId !== userId) {
          throw new UnauthorizedException("");
        }
      }

      return plainToInstance(HomeworkSubmissionDto, homeworkSubmission);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOrCreate(hashId: string, studentClassId: number): Promise<HomeworkSubmissionDto> {
    try {
      const homeworkSubmission = await this.homeworkSubmissionReposity.findOne({
        where: {
          homework: { hashId: hashId },
          studentClass: { id: studentClassId },
        },
        relations: ["homework", "studentClass"],
      });

      console.log("homeworkSubmission: ", homeworkSubmission);

      if (homeworkSubmission) {
        return plainToInstance(HomeworkSubmissionDto, homeworkSubmission);
      }

      const homework = await this.homeworkRepository.findOne({
        where: { hashId },
      });

      const studentClass = await this.studentClassRepository.findOne({
        where: { id: studentClassId },
      });

      if (!homework || !studentClass) {
        throw new NotFoundException("Homework or Student Class not found");
      }

      const newHomeworkSubmission = this.homeworkSubmissionReposity.create({
        homework,
        studentClass,
      });

      const savedHomeworkSubmission = await this.homeworkSubmissionReposity.save(newHomeworkSubmission);

      return plainToInstance(HomeworkSubmissionDto, savedHomeworkSubmission);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getStatus(userId: number, homeworkId: number): Promise<HomeworkSubmission[]> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const homeworkSubmissions = await this.homeworkSubmissionReposity
        .createQueryBuilder("submission")
        .leftJoinAndSelect("submission.studentClass", "studentClass")
        .leftJoinAndSelect("submission.files", "files")
        .where("submission.homeworkId = :homeworkId", { homeworkId })
        // .groupBy("studentClass.id")
        .getMany();

      return plainToInstance(HomeworkSubmission, homeworkSubmissions);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(homeworkId: number, studentClassId: number): Promise<HomeworkSubmissionDto> {
    const homework = await this.homeworkRepository.findOneBy({
      id: homeworkId,
    });
    if (!homework) {
      throw new NotFoundException("Homework not found");
    }

    const studentClass = await this.studentClassRepository.findOneBy({
      id: studentClassId,
    });
    if (!studentClass) {
      throw new NotFoundException(`Student in class not foun`);
    }

    const newHomeworkSubmission = this.homeworkSubmissionReposity.create({
      homework,
      studentClass,
    });

    const savedHomeworkSubmission = await this.homeworkSubmissionReposity.save(newHomeworkSubmission);

    await this.notificationService.sendNotification({
      userId: homework.teacherId,
      type: "NEW_EXAM",
      message: `Bài thi ${homework.title} đã được tạo.`,
      extraData: { homeworkId: homework.id },
    });

    return plainToInstance(HomeworkSubmissionDto, savedHomeworkSubmission);
  }

  async submit(userId: number, id: number, submitReqDto: SubmitReqDto): Promise<HomeworkSubmissionDto> {
    try {
      const { files } = submitReqDto;
      const homeworkSubmission = await this.homeworkSubmissionReposity.findOne({
        where: {
          id: id,
        },
        relations: ["homework", "studentClass.student.user"],
      });

      if (!homeworkSubmission) {
        throw new NotFoundException("Homework submission not found");
      }

      const { homework, studentClass } = homeworkSubmission;

      if (homework.isMustLogin && studentClass.student.userId !== userId) {
        throw new ForbiddenException();
      }

      if (homework.startDate && new Date(homework.startDate).getTime() > Date.now()) {
        throw new BadRequestException(`It's not time to start the assignment yet`);
      }

      if (homework.endDate && new Date(homework.endDate).getTime() < Date.now()) {
        throw new BadRequestException(`The exam has ended`);
      }

      await Promise.all(
        files.map((file) => {
          this.homeworkSubmissionFileService.create(
            plainToInstance(HomeworkSubmissionFile, {
              ...file,
              homeworkSubmission,
            })
          );
        })
      );

      return plainToInstance(HomeworkSubmissionDto, homeworkSubmission);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async mark(
    userId: number,
    homeworkSubmissionId: number,
    markHomeworkSubmissionDto: MarkHomeworkSubmissionDto
  ): Promise<HomeworkSubmissionDto> {
    try {
      const { comment, point, isShowPoint } = markHomeworkSubmissionDto;

      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const homeworkSubmission = await this.homeworkSubmissionReposity.findOne({
        where: { id: homeworkSubmissionId },
        relations: ["homework"],
      });
      if (!homeworkSubmission) {
        throw new NotFoundException("Homework submission not found");
      }

      if (homeworkSubmission.homework.teacherId !== teacher.id) {
        throw new UnauthorizedException("You not authorized for this homework submission");
      }

      const updatedHomeworkSubmission: HomeworkSubmission = {
        ...homeworkSubmission,
        comment,
        point,
        isShowPoint,
        confirmedAt: new Date(),
      };

      const savedHomeworkSubmission = await this.homeworkSubmissionReposity.save(updatedHomeworkSubmission);

      return plainToInstance(HomeworkSubmissionDto, savedHomeworkSubmission);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async requestResend(userId: number, homeworkSubmissionId: number): Promise<void> {
    try {
      const teacher = await this.teacherService.findOne({ userId });
      if (!teacher) {
        throw new NotFoundException("Teacher not found");
      }

      const homeworkSubmission = await this.homeworkSubmissionReposity.findOne({
        where: { id: homeworkSubmissionId },
        relations: ["homework"],
      });
      if (!homeworkSubmission) {
        throw new NotFoundException("Homework submission not found");
      }

      if (homeworkSubmission.homework.teacherId !== teacher.id) {
        throw new UnauthorizedException("You not authorized for this homework");
      }

      const updateHomeworkSubmission: HomeworkSubmission = {
        ...homeworkSubmission,
        isResend: true,
      };

      await this.homeworkSubmissionReposity.save(updateHomeworkSubmission);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
