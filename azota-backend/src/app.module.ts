import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfig } from "./config/typeorm.config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

import { AuthGuard } from "./common/guards/auth.guard";
import { LoggingInterceptor } from "./common/interceptor/logging.interceptor";
import { TimeoutInterceptor } from "./common/interceptor/timeout.interceptor";

import { AuthModule } from "./modules/auth/auth.module";
import { ClassgroupModule } from "./modules/classgroup/classgroup.module";
import { UserModule } from "./modules/user/user.module";
import { TeacherModule } from "./modules/teacher/teacher.module";
import { ClassroomModule } from "./modules/classroom/classroom.module";
import { StudentClassModule } from "./modules/stutentClass/studentClass.module";
import { HomeworkModule } from "./modules/homework/homework.module";
import { HomeworkFileModule } from "./modules/homeworkFile/homeworkFile.module";
import { HomeworkSubmissionModule } from "./modules/homeworkSubmission/homeworkSubmission.module";
import { StudentModule } from "./modules/student/student.module";
import { SharedModule } from "./shared/shared.module";
import { GradeModule } from "./modules/grade/grade.module";
import { SubjectModule } from "./modules/subject/subject.module";
import { PurposeModule } from "./modules/purpose/purpose.module";
import { ExamModule } from "./modules/exam/exam.module";
import { QuestionPartModule } from "./modules/questionPart/questionPart.module";
import { QuestionModule } from "./modules/question/question.module";
import { OptionModule } from "./modules/option/option.module";
import { ExamResultModule } from "./modules/examResult/examResult.module";
import { ConfigModule } from "@nestjs/config";
import googleOauthConfig from "./modules/auth/config/google-oauth.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleOauthConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig),
    SharedModule,
    AuthModule,
    UserModule,
    StudentModule,
    TeacherModule,
    ClassgroupModule,
    ClassroomModule,
    StudentClassModule,
    HomeworkModule,
    HomeworkFileModule,
    HomeworkSubmissionModule,
    GradeModule,
    SubjectModule,
    PurposeModule,
    ExamModule,
    QuestionPartModule,
    QuestionModule,
    OptionModule,
    ExamResultModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
