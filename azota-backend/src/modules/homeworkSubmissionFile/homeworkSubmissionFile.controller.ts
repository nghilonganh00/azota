import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { HomeworkSubmissionFileService } from "./homeworkSubmissionFile.service";
import { HomeworkMustLoginGuard } from "src/common/guards/homeworkMustLogin.guard";
import { HomeworkSubmissionFile } from "./homeworkSubmissionFile.entity";

@Controller("homework-submission-files")
export class HomeworkSubmissionFileController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly homeworkSubmissionFileService: HomeworkSubmissionFileService
  ) {}

  @UseGuards(HomeworkMustLoginGuard)
  @Post()
  async create(
    @Body() homeworkSubmisisonFile: HomeworkSubmissionFile
  ): Promise<HomeworkSubmissionFile> {
    return this.homeworkSubmissionFileService.create(homeworkSubmisisonFile);
  }
}
