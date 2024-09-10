import { Assignment } from "../../../../../Globals/Interfaces/interface";

interface Classroom {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  studentCount: number;
  classGroupId: string;
  createdAt: string;
  updatedAt: string;
  Assignments: Assignment[];
}

export type { Classroom };
