import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Classgroup } from "src/modules/classgroup/classgroup.entity";
import { Classroom } from "src/modules/classroom/classroom.entity";
import { Document } from "src/modules/document/document.entity";
import { DocumentFile } from "src/modules/documentFile/documentFile.entity";
import { Exam } from "src/modules/exam/exam.entity";
import { ExamClass } from "src/modules/examClass/examClass.entity";
import { ExamResult } from "src/modules/examResult/examResult.entity";
import { ExamResultAnswer } from "src/modules/examResultAnswer/examResultAnswer.entity";
import { ExamStudent } from "src/modules/examStudent/examStudent.entity";
import { Grade } from "src/modules/grade/grade.entity";
import { Homework } from "src/modules/homework/homework.entity";
import { HomeworkFile } from "src/modules/homeworkFile/homeworkFile.entity";
import { HomeworkSubmission } from "src/modules/homeworkSubmission/homeworkSubmission.entity";
import { HomeworkSubmissionFile } from "src/modules/homeworkSubmissionFile/homeworkSubmissionFile.entity";
import { Option } from "src/modules/option/option.entity";
import { Purpose } from "src/modules/purpose/purpose.entity";
import { Question } from "src/modules/question/question.entity";
import { QuestionPart } from "src/modules/questionPart/questionPart.entity";
import { School } from "src/modules/school/school.entity";
import { Student } from "src/modules/student/student.entity";
import { StudentClass } from "src/modules/stutentClass/studentClass.entity";
import { Subject } from "src/modules/subject/subject.entity";
import { Teacher } from "src/modules/teacher/teacher.entity";
import { TeacherGrade } from "src/modules/teacherGrade/teacherGrade.entity";
import { TeacherSubject } from "src/modules/teacherSubject/teacherSubject.entity";
import { User } from "src/modules/user/user.entity";

export const typeormConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "azota",
  entities: [
    Classgroup,
    Classroom,
    Student,
    User,
    Teacher,
    School,
    Document,
    DocumentFile,
    Exam,
    ExamClass,
    ExamResult,
    ExamResultAnswer,
    ExamStudent,
    Grade,
    Homework,
    HomeworkFile,
    HomeworkSubmission,
    HomeworkSubmissionFile,
    Option,
    Question,
    QuestionPart,
    School,
    Student,
    Teacher,
    Subject,
    Purpose,
    TeacherSubject,
    TeacherGrade,
    StudentClass,
  ],
  // logger: "advanced-console",
  // logging: "all",
  synchronize: true,
};
