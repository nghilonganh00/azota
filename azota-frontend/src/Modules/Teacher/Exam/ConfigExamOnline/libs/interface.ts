import { Student as IStudent } from "../../../Class/ClassDetail/Interface/interface";

export interface Student extends IStudent {
  isAssigned: boolean;
}

export interface Classroom {
  id: number;
  className: string;
  studentCount: number;
  assignedStudentCount: number;
  Students: Student[];
}

export interface ClassGroup {
  id: number;
  classgroupName: string;
  classrooms: Classroom[];
}
