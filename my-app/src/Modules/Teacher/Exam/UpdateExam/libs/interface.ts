import { Question } from "../../ExamReview/libs/interface";

export interface Exam {
  id: number;
  examName: string;
  Questions: Question[];
}
