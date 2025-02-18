import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeworkSubmissionFile } from "./homeworkSubmissionFile.entity";
import { HomeworkSubmissionFileController } from "./homeworkSubmissionFile.controller";
import { HomeworkSubmissionFileService } from "./homeworkSubmissionFile.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkSubmissionFile])],
  controllers: [HomeworkSubmissionFileController],
  providers: [HomeworkSubmissionFileService],
  exports: [HomeworkSubmissionFileService],
})
export class HomeworkSubmissionFileModule {}
