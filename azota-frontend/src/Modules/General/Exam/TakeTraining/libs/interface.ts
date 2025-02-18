import { User } from "../../../../../Globals/Interfaces/userInterface";
import { Question } from "../../../../Teacher/Exam/ExamReview/libs/interface";
import { Exam as IExam } from "../../../../../Globals/Interfaces/exam.interface";

export interface NewUser extends User {
  accessToken: string;
}

export interface QuestionResult {
  correct: boolean;
  firstTime: boolean;
}

export interface ResultLog {
  [key: string]: boolean;
}

export interface AnswerOption {
  Index: number;
  Content: string;
}

export interface ExamAnswer {
  Answered: number;
  QuestionId: number;
  AnswerContent: AnswerOption[];
}

export interface Exam extends IExam {
  Questions: Question[];
}
