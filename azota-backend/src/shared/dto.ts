import { Transform, Type } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value
  )
  page?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value
  )
  limit?: number;

  @IsOptional()
  @IsString()
  searchField?: string;

  @IsOptional()
  @IsString()
  searchKeyword?: string;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  sortOrder?: "ASC" | "DESC";
}
