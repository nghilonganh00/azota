import { Question } from "../../ExamReview/libs/interface";

import { ExamConfig } from "../../../../../Globals/Interfaces/interface";

export interface Exam extends ExamConfig {
  id: number;
  examName: string;
  Questions: Question[];
}
