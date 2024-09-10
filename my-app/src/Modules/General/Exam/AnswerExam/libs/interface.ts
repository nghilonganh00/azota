import {
  ExamConfig,
  ExamResult,
} from "../../../../../Globals/Interfaces/interface";
import { Question } from "../../../../Teacher/Exam/ExamReview/libs/interface";
import { Student } from "../../../../Teacher/Homework/ResultsList/Interface/interface";

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
