import { IsBoolean, IsString } from "class-validator";

export class MarkHomeworkSubmissionDto {
  @IsString()
  comment: string;

  @IsString()
  point: string;

  @IsBoolean()
  isShowPoint: boolean = false;
}
