export interface Teacher {
  id: number;
  userFullName: string;
}

interface Class {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  studentCount: number;
  classGroupId: string;
  createdAt: string;
  updatedAt: string;
}

interface HomeworkFile {
  id: number;
  homeworkId: number;
  hwfileName: string;
  hwfileLink: string;
  createdAt: string;
  updatedAt: string;
}

interface HomeworkResultFile {
  id: string;
  hwrfLink: string;
  hwResultId: number;
}

interface HomeworkResult {
  id: string;
  note: string | null;
  resendRequest: false;
  resendNote: string | null;
  point: number;
  confirmedAt: string;
  createdAt: string;
  updatedAt: string;
  studentId: number;
  homeworkId: number;
  HwResultFiles: HomeworkResultFile[];
}

interface Assignment {
  id: number;
  hashId: string;
  classId: number;
  homeworkId: number;
  createdAt: string;
  updatedAt: string;
}

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

interface ExamConfig {
  id: number;
  hashId: string;
  examName: string;
  examAssignType: "ALL" | "CLASS" | "STUDENT";
  examSubmitCount: number;
  teacherId: number;
  gradeId: number;
  subjectId: number;
  purposeId: number;
  examDuration: number;
  examType: string;
  examStart: string | null;
  examEnd: string | null;
  isPublish: boolean;
  examLimitSubmit: number;
  isRandomQuestion: boolean;
  isHideGroupQuestionTitle: boolean;
  isSectionsStartingFromQuestion1: boolean;
  showResult: string;
  showAnswer: string;
  fee: string;
  header: string | null;
  createdAt: string;
  updatedAt: string;
  questionTotal: number;
  submitTotal: number;
}

export interface ExamByClass {
  id: number;
  classId: number;
  examId: number;
}

export type Tab = {
  name: string;
  value: string;
};

export interface ExamResult {
  id: number;
  examresStarted: string;
  examresSaved: string;
  rightAnswer: number;
  questionTotal: number;
  examresAnswers: string;
  mark: number;
  createdAt: string;
}

export type { Class, HomeworkFile, HomeworkResult, Assignment, ExamConfig };
