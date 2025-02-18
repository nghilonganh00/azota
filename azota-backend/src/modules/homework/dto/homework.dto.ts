import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Exclude } from "class-transformer";
import { HomeworkFile } from "../../homeworkFile/homeworkFile.entity";
import { Teacher } from "../../teacher/teacher.entity";

export class HomeworkDto {
  @ApiProperty({
    example: "Bài tập ngày 19/1",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "Làm bài mai cô chữa nhé",
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: "2025-19-1",
  })
  startDate: Date;

  @ApiProperty({
    example: "2025-20-1",
  })
  endDate: Date;

  isMustLogin: boolean;
  isShowResult: boolean;

  @ApiProperty({
    example: [{}],
  })
  homeworkFiles: HomeworkFile[];

  @ApiProperty({
    example: [1],
  })
  @IsNotEmpty()
  classroomIds: number[];

  @Exclude()
  teacher: Teacher;
}

export class createHomeworkResDto {
  @Exclude()
  homeworkFiles: HomeworkFile[];

  @Exclude()
  teacher: Teacher;
}

export class UpdateHomeworkDto {}
