import { Homework } from "../../homework/homework.entity";
import { HomeworkSubmissionFile } from "../../homeworkSubmissionFile/homeworkSubmissionFile.entity";
import { StudentClass } from "../../stutentClass/studentClass.entity";

export class HomeworkSubmissionDto {
  note: string;

  isResend: boolean;

  resendMessage: string;

  point: number;

  confirmedAt: Date;

  homework: Homework;

  studentClass: StudentClass;

  files: HomeworkSubmissionFile[];
}
