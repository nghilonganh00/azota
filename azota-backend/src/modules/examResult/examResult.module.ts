import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExamResult } from "./examResult.entity";
import { ExamResultController } from "./examResult.controller";
import { ExamResultService } from "./examResult.service";
import { Exam } from "../exam/exam.entity";
import { ExamResultUtilService } from "./examResultUtil.service";
import { Student } from "../student/student.entity";
import { Classroom } from "../classroom/classroom.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult, Exam, Student, Classroom])],
  controllers: [ExamResultController],
  providers: [ExamResultService, ExamResultUtilService],
  exports: [ExamResultService],
})
export class ExamResultModule {}
