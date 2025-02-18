import { Exclude } from "class-transformer";

export class PreviewExamDto {
  @Exclude()
  questionParts: any;

  @Exclude()
  examResults: any;
}
