import { Exam, ExamResult, ExamResult as IExamResult } from "../../../../../Globals/Interfaces/exam.interface";
import { Student } from "../../../../../Globals/Interfaces/user.interface";

export interface ExamConfig extends Exam {
  mark: number;
}

export interface ExamResultMark extends ExamResult {
  score: number;
  correctQuestionTotal: number;
  questionTotal: number;
}
