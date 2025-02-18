import { Exclude, Type } from "class-transformer";
import { Option as IOption } from "../../option/option.entity";
import { Question as IQuestion } from "../../question/question.entity";

class Option extends IOption {
  @Exclude()
  isCorrect: boolean;
}

class Question extends IQuestion {
  @Type(() => Option)
  options: Option[];

  @Exclude()
  method: string;

  @Exclude()
  explain: string;
}

class QuestionPart {
  @Type(() => Question)
  questions: Question[];
}

export class GetExamContentByHashIdDto {
  @Type(() => QuestionPart)
  questionParts: QuestionPart[];
}
