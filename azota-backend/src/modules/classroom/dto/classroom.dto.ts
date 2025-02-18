import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { StudentClass } from "src/modules/stutentClass/studentClass.entity";
import { Teacher } from "src/modules/teacher/teacher.entity";

export class ClassroomDto {
  @ApiProperty({
    example: "Lớp 12A1",
  })
  @IsNotEmpty()
  @IsString()
  className: string;

  @ApiProperty({
    example: "2025",
  })
  @IsString()
  classYear: string;

  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  classgroupId: number;

  studentClasses: StudentClass[];

  @Exclude()
  teacher: Teacher;
}
