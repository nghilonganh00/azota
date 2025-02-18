import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class ClassgroupDto {
  @Type(() => Number)
  id: number;

  @ApiProperty({
    example: "Lớp 12A1",
  })
  @Expose()
  @IsString()
  @IsNotEmpty({ message: "Classgroup name should not be empty" })
  classgroupName: string;
}
