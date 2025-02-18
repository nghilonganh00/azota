export class AnswerContent {
  Index: number;
  Content: string;
}

export class ExamResultAnswerDto {
  Answered: boolean;
  QuestionId: number;
  AnswerContent: AnswerContent[];
}
