import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeworkSubmission } from "./homeworkSubmission.entity";
import { HomeworkSubmissionController } from "./homeworkSubmission.controller";
import { HomeworkSubmissionService } from "./homeworkSubmission.service";
import { Homework } from "../homework/homework.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";
import { HomeworkMustLoginGuard } from "src/common/guards/homeworkMustLogin.guard";
import { APP_GUARD } from "@nestjs/core";
import { HomeworkModule } from "../homework/homework.module";
import { HomeworkSubmissionFileService } from "../homeworkSubmissionFile/homeworkSubmissionFile.service";
import { HomeworkSubmissionFileModule } from "../homeworkSubmissionFile/homeworkSubmissionFile.module";
import { TeacherModule } from "../teacher/teacher.module";
import { NotificationModule } from "../notification/notification.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeworkSubmission, Homework, StudentClass]),
    TeacherModule,
    forwardRef(() => HomeworkModule),
    HomeworkSubmissionFileModule,
    NotificationModule,
  ],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService],
  exports: [HomeworkSubmissionService],
})
export class HomeworkSubmissionModule {}
