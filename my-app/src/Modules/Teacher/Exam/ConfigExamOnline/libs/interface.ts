import { Student } from "../../../Class/ClassDetail/Interface/interface";

export interface Classroom {
  id: number;
  className: string;
  studentCount: number;
  Students: Student[];
}

export interface ClassGroup {
  id: number;
  classGroupName: string;
  Classes: Classroom[];
}
