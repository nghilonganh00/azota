import { type } from "os";
import { Homework } from "../../ResultsList/Interface/interface";

interface ClassWithHomework {
  id: string;
  className: string;
  classYear: string;
  teacherId: string;
  classGroupId: string;
  createdAt: string;
  updatedAt: string;
  Assignments: Homework[];
}

export type { ClassWithHomework };
