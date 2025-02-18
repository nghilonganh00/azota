import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateHomeworkReq {
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
}

export class UpdateHomeworkRes {
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
}
