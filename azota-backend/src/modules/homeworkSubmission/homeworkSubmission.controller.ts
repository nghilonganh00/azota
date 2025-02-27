import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { HomeworkSubmissionService } from "./homeworkSubmission.service";
import { HomeworkSubmissionDto } from "./dto/homeworkSubmission.dto";
import { HomeworkMustLoginGuard } from "src/common/guards/homeworkMustLogin.guard";
import { SubmitReqDto } from "./dto/submit-homeworkFile.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/shared/constant";
import { HomeworkSubmission } from "./homeworkSubmission.entity";
import { MarkHomeworkSubmissionDto } from "./dto/mark-homeworkSubmission.dto";

@Controller("homework-submissions")
export class HomeworkSubmissionController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly homeworkSubmissionService: HomeworkSubmissionService
  ) {}

  @Get("/:homeworkSubmissionId")
  async findOne(@Param("homeworkSubmissionId") homeworkSubmissionId: number): Promise<HomeworkSubmissionDto> {
    const userId = this.request?.user?.sub;
    return this.homeworkSubmissionService.findOne(userId, homeworkSubmissionId);
  }

  @Get("/homework/:hashId/student-class/:studentClassId")
  async getOrCreate(
    @Param("hashId") hashId: string,
    @Param("studentClassId") studentClassId: number
  ): Promise<HomeworkSubmissionDto> {
    return this.homeworkSubmissionService.getOrCreate(hashId, studentClassId);
  }

  @Get("/status/homework/:homeworkId")
  @Roles([UserRole.TEACHER])
  async getStatus(@Param("homeworkId") homeworkId: number): Promise<HomeworkSubmission[]> {
    const userId = this.request?.user?.sub;

    return this.homeworkSubmissionService.getStatus(userId, homeworkId);
  }

  @Post("/:id/submit")
  async submit(@Param("id") id: number, @Body() submitReqDto: SubmitReqDto): Promise<HomeworkSubmissionDto> {
    const userId = this.request?.user?.sub;

    return this.homeworkSubmissionService.submit(userId, id, submitReqDto);
  }

  @Patch("/:homeworkSubmissionId/mark")
  @Roles([UserRole.TEACHER])
  async mark(
    @Param("homeworkSubmissionId") homeworkSubmissionId: number,
    @Body() markHomeworkSubmissionDto: MarkHomeworkSubmissionDto
  ): Promise<HomeworkSubmissionDto> {
    const userId = this.request?.user?.sub;

    return this.homeworkSubmissionService.mark(userId, homeworkSubmissionId, markHomeworkSubmissionDto);
  }

  @Patch("/:homeworkSubmissionId/request-resend")
  @Roles([UserRole.TEACHER])
  async requestResend(@Param("homeworkSubmissionId") homeworkSubmissionId: number): Promise<{ message: string }> {
    const userId = this.request?.user?.sub;

    await this.homeworkSubmissionService.requestResend(userId, homeworkSubmissionId);

    return { message: "Request to resend homework submission successfully." };
  }
}
