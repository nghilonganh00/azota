import { Exam as IExam } from "../../../../../Globals/Interfaces/exam.interface";
import { Question } from "../../ExamReview/libs/interface";


export interface Exam extends IExam{
  id: number;
  examName: string;
  Questions: Question[];
}
