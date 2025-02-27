import { IsBoolean, IsOptional, IsString } from "class-validator";

export class MarkHomeworkSubmissionDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsString()
  point: string;

  @IsBoolean()
  isShowPoint: boolean = false;
}
