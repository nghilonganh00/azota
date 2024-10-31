import {
  Class as IClass,
  ExamConfig,
  ExamResult,
  Teacher,
  Class,
} from "../../../../../Globals/Interfaces/interface";
import { Student } from "../../../Homework/ResultsList/Interface/interface";

export interface ClassGroup {
  classGroupId: string;
  classGroupName: string;
  Classes: Class[];
}

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
  classId: number;
  examresStarted: string;
  createdAt: string;
  ExamResults: ExamResult[];
}
