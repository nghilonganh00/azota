import { type } from "os";

interface Homework {
  homeworkName: string;
  homeworkContent: string;
  homeworkStartDate: string;
  homeworkEndDate: string;
  homeworkShowResult: string;
  homeworkMustLogin: string;
  classIds: number[];
}

export type { Homework };
