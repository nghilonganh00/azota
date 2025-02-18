import { Body, Controller, Delete, Inject, Param, Post } from "@nestjs/common";
import { HomeworkFileDto } from "./homeworkFile.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/shared/constant";
import { REQUEST } from "@nestjs/core";
import { HomeworkFileService } from "./homeworkFile.service";

@Controller("homework-files")
export class HomeworkFileController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly homeworkFileService: HomeworkFileService
  ) {}

  @Post()
  @Roles([UserRole.TEACHER])
  async create(
    @Body() homeworkFileDto: HomeworkFileDto
  ): Promise<HomeworkFileDto> {
    const userId = this.request?.user?.sub;

    return this.homeworkFileService.create(userId, homeworkFileDto);
  }

  @Delete(":id")
  @Roles([UserRole.TEACHER])
  async remove(@Param("id") id: number): Promise<void> {
    const userId = this.request?.user?.sub;

    return this.homeworkFileService.remove(userId, id);
  }
}
