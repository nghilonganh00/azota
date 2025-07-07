import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./exam.entity";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { QuestionPartModule } from "../questionPart/questionPart.module";
import { QuestionModule } from "../question/question.module";
import { OptionModule } from "../option/option.module";
import { ClassroomModule } from "../classroom/classroom.module";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), QuestionPartModule, QuestionModule, OptionModule, ClassroomModule, StudentModule],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
