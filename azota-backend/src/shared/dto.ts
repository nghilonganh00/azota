import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class QueryParamsDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  searchField?: string;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  searchKeyword?: string;

  @ApiPropertyOptional({ example: "createdAt" })
  @IsOptional()
  @IsString()
  sortField?: string = "createdAt";

  @ApiPropertyOptional({ example: "ASC" })
  @IsOptional()
  @IsEnum(["ASC", "DESC"])
  sortOrder?: string = "ASC";
}
