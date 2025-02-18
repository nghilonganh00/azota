import { ExamResult } from "../../../../../Globals/Interfaces/exam.interface";
import { Teacher } from "../../../../../Globals/Interfaces/user.interface";
import { Student } from "../../../Class/ClassDetail/Interface/interface";

export interface Option {
  id: number;
  key: string;
  optionContent: string;
  isAnswer: boolean;
  questionId: number;
  createdAt: string;
  updatedAt: string;
  QuestionId: number;
}

export interface QuestionPart {
  id: number;
  questionPartName: string;
  examId: number;
  createdAt: string;
  updatedAt: string;
  ExamId: number;
}

export interface Question {
  id: number;
  scorePerQuestion: number;
  rawIndex: number;
  questionTopic: string;
  questionType: string;
  questionMethod: string | null;
  questionExplain: string | null;
  examId: number;
  questionPartId: number;
  createdAt: string;
  updatedAt: string;
  Options: Option[];
  QuestionPart: QuestionPart;
}

export interface GroupedQuestionPart {
  id: number;
  questionPartName: string;
  examId: number;
  createdAt: string;
  updatedAt: string;
  ExamId: number;
  questions: Question[];
}

export interface ExamReviewI {
  examObj: any;
  examResult: ExamResult;
  historyExamResultObjs: ExamResult[];
  correctQuestionIds: number[];
  studentObj: Student;
  markedByObj: Teacher;
}

export interface MarkedExamResult extends ExamResult {
  score: number;
  correctTotal: number;
  correctQuestionIds: number[];
  questionTotal: number;
}
