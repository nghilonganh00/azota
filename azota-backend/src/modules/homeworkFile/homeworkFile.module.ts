import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeworkFile } from "./homeworkFile.entity";
import { HomeworkFileController } from "./homeworkFile.controller";
import { HomeworkFileService } from "./homeworkFile.service";
import { Module } from "@nestjs/common";
import { Homework } from "../homework/homework.entity";

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkFile, Homework])],
  controllers: [HomeworkFileController],
  providers: [HomeworkFileService],
  exports: [HomeworkFileService],
})
export class HomeworkFileModule {}
