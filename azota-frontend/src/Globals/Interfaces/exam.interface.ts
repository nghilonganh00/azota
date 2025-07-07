import { Classroom } from "../../Modules/Teacher/Homework/PublishHomework/Interfaces/interfaces";
import { ExamAssignType, ExamType, QuestionType } from "../Constant/constant";
import { StudentClass } from "./info.interface";
import { Student, Teacher } from "./user.interface";

export interface Option {
  id: number;
  key: string;
  content: string;
  isCorrect: boolean;
  questionId: number;
  createdAt: string;
  updatedAt: string;
  QuestionId: number;
}

export interface Question {
  id: number;
  topic: string;
  scorePerQuestion: number;
  rawIndex: number;
  type: QuestionType;
  method: string | null;
  explain: string | null;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

export interface QuestionPart {
  id: number;
  title: string;
  rawIndex: number;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface Exam {
  id: number;
  hashId: string;
  teacherId: number;
  gradeId: number;
  subjectId: number;
  purposeId: number;
  examType: "TEST" | "PRACTICE";
  isPublish: boolean;
  examLimitSubmit: number;
  isRandomQuestion: boolean;
  isHideGroupQuestionTitle: boolean;
  isSectionsStartingFromQuestion1: boolean;
  showResult: "NO" | "SUBMITTED" | "ALL_SUBMITTED";
  showAnswer: "NO" | "SUBMITTED" | "ALL_SUBMITTED" | "REACHED_POINT";
  fee: string;
  header: string | null;
  createdAt: string;
  updatedAt: string;
  questionTotal: number;
  submitTotal: number;
  assignedStudentIds: number[];
  assignedClassIds: number[];
  title: string;
  duration: number;
  assignType: ExamAssignType;
  teacher: Teacher;
  examResults: ExamResult[];
  examClasses: ExamClass[];
  questionParts: QuestionPart[];
  type: ExamType;
  startDate: string;
  endDate: string;
  examStudents: ExamStudent[];
}

export interface ExamClass {
  id: number;
  classId: number;
  examId: number;
  exam: Exam;
  classroom: Classroom;
}

export interface ExamStudent {
  id: number;
  examId: number;
  exam: Exam;
  studentClass: StudentClass;
}

export interface ExamByClass {
  id: number;
  classId: number;
  examId: number;
}

export interface ExamResult {
  id: number;
  examresStarted: string;
  examresSaved: string;
  rightAnswer: number;
  startedAt: string;
  savedAt: string;
  questionTotal: number;
  examresAnswers: string;
  mark: number;
  createdAt: string;
  examId: number;
  studentId: number;
  exam: Exam;
  student: Student;
  answer: string;
}

export interface ExamByStudent {
  id: number;
  examId: number;
  studentId: number;
}
