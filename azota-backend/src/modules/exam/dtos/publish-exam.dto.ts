import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { ExamAssignType, ExamType, FeeType, ShowAnswer, ShowResult } from "src/shared/constant";
import { IsDateValidConstraint } from "../validators/is-date-valid.validator";
import { Expose, Transform, Type } from "class-transformer";

export class PublishExamDto {
  @Type(() => String)
  @IsString()
  title: string;

  @Type(() => Number)
  @IsNumber()
  submitCount: number;

  @Type(() => String)
  @IsEnum(ExamType)
  type: ExamType;

  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) => (value < 0 ? 0 : value))
  duration: number;

  @Validate(IsDateValidConstraint)
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Validate(IsDateValidConstraint)
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @Type(() => Number)
  @IsNumber()
  limitSubmit: number;

  @Type(() => Boolean)
  @IsBoolean()
  isRandomQuestion: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  isHideGroupQuestionTitle: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  isSectionsStartingFromQuestion1: boolean;

  @Type(() => String)
  @IsEnum(ExamAssignType)
  assignType: ExamAssignType;

  @Type(() => String)
  @IsEnum(ShowResult)
  showResult: ShowResult;

  @Type(() => String)
  @IsEnum(ShowAnswer)
  showAnswer: ShowAnswer;

  @Type(() => String)
  @IsEnum(FeeType)
  fee: FeeType;

  @Type(() => String)
  @IsString()
  @IsOptional()
  header: string | null;

  @Type(() => Number)
  @IsInt()
  gradeId: number;

  @Type(() => Number)
  @IsInt()
  purposeId: number;

  @Type(() => Number)
  @IsInt()
  subjectId: number;

  @Type(() => Number)
  @IsArray()
  @IsInt({ each: true })
  assignedClassIds: number[];

  @Type(() => Number)
  @IsArray()
  @IsInt({ each: true })
  assignedStudentIds: number[];
}
