import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Homework } from "./homework.entity";
import { HomeworkController } from "./homework.controller";
import { HomeworkService } from "./homework.service";
import { HomeworkFileModule } from "../homeworkFile/homeworkFile.module";
import { Classroom } from "../classroom/classroom.entity";
import { HomeworkSubmissionModule } from "../homeworkSubmission/homeworkSubmission.module";

@Module({
  imports: [TypeOrmModule.forFeature([Homework, Classroom]), HomeworkFileModule, HomeworkSubmissionModule],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports: [HomeworkService],
})
export class HomeworkModule {}
