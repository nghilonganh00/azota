import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { Gender } from "src/shared/constant";

export class StudentClassDto {
  @ApiProperty({
    example: "Lê Văn Thịnh",
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: "thienlv2@gmail.com",
    nullable: true,
  })
  @Transform(({ value }) => (value === "" ? null : value))
  @IsOptional()
  @IsEmail()
  email: string | null;

  @ApiProperty({
    example: "0123456789",
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender = Gender.MALE;

  @ApiProperty({
    example: "1995-06-15",
  })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @IsDate()
  DOB: Date;

  @ApiProperty({
    example: "000005",
  })
  @IsNotEmpty()
  @IsString()
  identificationNumber: string;

  @ApiProperty({
    example: 12,
  })
  @IsNotEmpty()
  @IsInt()
  classroomId: number;
}
