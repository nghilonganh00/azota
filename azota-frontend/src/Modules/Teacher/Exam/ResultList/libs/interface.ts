import { Exam, ExamResult } from "../../../../../Globals/Interfaces/exam.interface";
import { Classroom } from "../../../../../Globals/Interfaces/info.interface";
import { Student, Teacher } from "../../../../../Globals/Interfaces/user.interface";

export interface ClassGroup {
  classGroupId: string;
  classgroupName: string;
  classrooms: Classroom[];
}

export interface ExamInfo {
  examObj: Exam;
  assignedClassObjs: Classroom[];
  assignedStudentObjs: Student[];
  authorObj: Teacher;
  classGroupObjs: ClassGroup[];
}

export interface StudentResult extends ExamResult {
  id: number;
  studentName: string;
  classId: number;
  examresStarted: string;
  createdAt: string;
  score: number;
  questionTotal: number;
  correctQuestionTotal: number;
  ExamResults: ExamResult[];
}
