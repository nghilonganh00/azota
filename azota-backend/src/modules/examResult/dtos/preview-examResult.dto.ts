import { Exclude } from "class-transformer";

export class PreviewExamResultDto {
  @Exclude()
  answer: string;
}
