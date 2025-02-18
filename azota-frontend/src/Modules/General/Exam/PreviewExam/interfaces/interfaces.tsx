import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

export interface ExamPreview extends Exam {
  questionTotal: number;
  examResultTotal: number;
}
