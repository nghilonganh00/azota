import {
  Class,
  ExamConfig,
  ExamResult,
  Teacher,
} from "../../../../../Globals/Interfaces/interface";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";
import { Student } from "../../../Homework/ResultsList/Interface/interface";

export interface ExamInfo {
  examObj: ExamConfig;
  assignedClassObjs: Class[];
  assignedStudentObjs: Student[];
  authorObj: Teacher;
  classGroupObjs: ClassGroup[];
}

export interface StudentResult {
  id: number;
  studentName: string;
  examresStarted: string;
  createdAt: string;
  ExamResults: ExamResult[];
}
