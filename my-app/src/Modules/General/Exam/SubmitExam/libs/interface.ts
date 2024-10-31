import { Student } from "../../../../Teacher/Homework/ResultsList/Interface/interface";
import {
  ExamConfig as IExamConfig,
  ExamResult as IExamResult,
} from "../../../../../Globals/Interfaces/interface";

export interface ExamConfig extends IExamConfig {
  mark: number;
}

export interface ExamResult {
  examObj: ExamConfig;
  examResult: IExamResult;
  studentObj: Student;
}
