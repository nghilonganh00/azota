import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HomeworkSubmissionFile } from "./homeworkSubmissionFile.entity";
import { Repository } from "typeorm";
import { HomeworkSubmissionFileDto } from "./dto/homeworkSubmissionFile.dto";

@Injectable()
export class HomeworkSubmissionFileService {
  constructor(
    @InjectRepository(HomeworkSubmissionFile)
    private homeworkSubmissionFileRepository: Repository<HomeworkSubmissionFile>
  ) {}

  async create(
    homeworkSubmissionFile: HomeworkSubmissionFile
  ): Promise<HomeworkSubmissionFile> {
    try {
      const newHomeworkSubmissionFile =
        this.homeworkSubmissionFileRepository.create({
          ...homeworkSubmissionFile,
        });

      return await this.homeworkSubmissionFileRepository.save(
        newHomeworkSubmissionFile
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
