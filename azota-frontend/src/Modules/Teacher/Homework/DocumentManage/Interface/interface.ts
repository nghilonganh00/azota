import { Homework } from "../../../../../Globals/Interfaces/homework.interface";

export interface ClassWithHomework {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  classGroupId: string;
  createdAt: string;
  updatedAt: string;
  homeworks: Homework[];
}
