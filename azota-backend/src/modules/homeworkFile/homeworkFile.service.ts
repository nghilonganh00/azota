import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HomeworkFile } from "./homeworkFile.entity";
import { Repository } from "typeorm";
import { HomeworkFileDto } from "./homeworkFile.dto";
import { Homework } from "../homework/homework.entity";
import { plainToInstance } from "class-transformer";
import { TeacherService } from "../teacher/teacher.service";

@Injectable()
export class HomeworkFileService {
  constructor(
    @InjectRepository(HomeworkFile)
    private homeworkFileRepository: Repository<HomeworkFile>,

    @InjectRepository(Homework)
    private homeworkRepository: Repository<Homework>,
    private readonly teacherService: TeacherService
  ) {}

  async create(
    userId: number,
    homeworkFileDto: HomeworkFileDto
  ): Promise<HomeworkFileDto> {
    const teacher = await this.teacherService.findOne({ userId });

    const homework = await this.homeworkRepository.findOne({
      where: { id: homeworkFileDto.homeworkId },
    });

    if (!homework) {
      throw new NotFoundException("Homework not found");
    }

    if (homework.teacherId !== teacher.id) {
      throw new UnauthorizedException("Teacher unauthorized");
    }

    const newHomeworkFile = this.homeworkFileRepository.create({
      ...homeworkFileDto,
      homework,
    });

    try {
      const savedHomeworkFile =
        await this.homeworkFileRepository.save(newHomeworkFile);

      return plainToInstance(HomeworkFileDto, savedHomeworkFile);
    } catch (error) {
      throw new InternalServerErrorException("Create HomeworkFile Error");
    }
  }

  async remove(userId: number, id: number): Promise<void> {
    const teacher = await this.teacherService.findOne({ userId });

    const homeworkFile = await this.homeworkFileRepository.findOne({
      where: { id },
      relations: ["homework"],
    });

    if (!homeworkFile) {
      throw new NotFoundException("Homework file not found");
    }

    if (homeworkFile.homework.teacherId !== teacher.id) {
      throw new UnauthorizedException("Teacher unauthorized");
    }

    await this.homeworkFileRepository.softRemove(homeworkFile);
  }
}
