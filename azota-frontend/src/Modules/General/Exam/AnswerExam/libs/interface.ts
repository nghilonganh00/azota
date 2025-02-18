import { ExamResult } from "../../../../../Globals/Interfaces/exam.interface";
import { Student } from "../../../../../Globals/Interfaces/user.interface";
import { Question } from "../../../../Teacher/Exam/ExamReview/libs/interface";

interface Exam {
  examName: string;
  Questions: Question[];
}

export interface ExamReview {
  examObj: Exam;
  examResult: ExamResult;
  studentObj: Student;
  correctQuestionIds: number[];
}
