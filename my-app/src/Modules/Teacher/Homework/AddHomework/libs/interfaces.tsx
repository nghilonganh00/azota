import { Class } from "../../../../../Globals/Interfaces/interface";

interface NewHomework {
  homeworkName: string;
  homeworkContent: string;
  homeworkStartDate: string;
  homeworkEndDate: string;
  homeworkShowResult: string;
  homeworkMustLogin: string;
  homeworkFiles: File[];
  classIds: number[];
}

interface ClassGroup {
  id: number;
  classGroupName: string;
  teacherId: number;
  Classes: Class[];
}

export type { NewHomework, ClassGroup };
