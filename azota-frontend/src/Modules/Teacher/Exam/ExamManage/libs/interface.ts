import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

export interface ExamPreview extends Exam {
  submitTotal: number;
}
