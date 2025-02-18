import { Classroom, StudentClass } from "./info.interface";

export interface Homework {
  id: number;
  hashId: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isShowResult: boolean;
  isMustLogin: boolean;
  isInTrash: boolean;
  createdAt: string;
  teacherId: number;
  classroomId: number;
  classroom: Classroom;
  homeworkFiles: HomeworkFile[];
}

export interface HomeworkFile {
  id: number;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  homework: Homework;
}

export interface HomeworkSubmission {
  id: number;
  note: string;
  isResend: boolean;
  resendMessage: string;
  point: number;
  confirmedAt: string;
  homework: Homework;
  studentClass: StudentClass;
  files: HomeworkSubmissionFile[];
}

export interface HomeworkSubmissionFile {
  id: number;
  title: string;
  link: string;
}

export interface HomeworkResultFile {
  id: string;
  hwrfLink: string;
  hwResultId: number;
}

export interface HomeworkResult {
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
