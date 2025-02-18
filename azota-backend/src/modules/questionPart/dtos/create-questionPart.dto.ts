import { Exam } from "src/modules/exam/exam.entity";

export class CreateQuestionPartDto {
  title: string;
  rawIndex: number;
  examId: number;
  exam: Exam;
}
