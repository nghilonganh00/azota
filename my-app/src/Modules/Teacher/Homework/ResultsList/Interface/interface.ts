import {
  Class,
  HomeworkFile,
  HomeworkResult,
} from "../../../../../Globals/Interfaces/interface";

interface Homework {
  id: string;
  Homework: {
    id: number;
    homeworkName: string;
    homeworkContent: string;
    homeworkStartDate: string | null;
    homeworkEndDate: string | null;
    homeworkShowResult: boolean;
    homeworkMustLogin: boolean;
    teacherId: string;
    HomeworkFiles: HomeworkFile[];
  };
  Class: Class;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  id: string;
  userId: number;
  studentName: string;
  studentGender: boolean;
  studentPhone: string;
  studentEmail: string;
  HomeworkResults: HomeworkResult[];
}

export type { Homework, Student };
