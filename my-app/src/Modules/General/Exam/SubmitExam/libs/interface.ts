import { Student } from "../../../../Teacher/Homework/ResultsList/Interface/interface";
import {ExamConfig, ExamResult as IExamResult} from "../../../../../Globals/Interfaces/interface"

export interface ExamResult {
  examObj: ExamConfig;
  examResult: IExamResult;
  studentObj: Student;
}
