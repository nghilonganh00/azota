import { Body, Controller, Delete, Get, Inject, Param, Post, Query, ValidationPipe } from "@nestjs/common";
import { ExamService } from "./exam.service";
import { UserRole } from "src/shared/constant";
import { CreateExamDto } from "./dtos/create-exam.dto";
import { ExamDto } from "./dtos/exam.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { REQUEST } from "@nestjs/core";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { QueryParamsDto } from "src/shared/dto";
import { PublishExamDto } from "./dtos/publish-exam.dto";
import { PreviewExamDto } from "./dtos/preview-exam.dto";
import { Public } from "src/common/decorators/public.decorator";
import { GetExamContentByHashIdDto } from "./dtos/get-examContentByHashId";

@ApiTags("Exam")
@Controller("exams")
export class ExamController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly examService: ExamService
  ) {}

  @ApiOperation({
    summary: "Get list of exam",
    description: "Exam include: config, examResults, assignments",
  })
  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("previews")
  async getPreviews(@Query() queryParams: QueryParamsDto): Promise<ExamDto[]> {
    const userId = this.request?.user.sub;

    return this.examService.getPreviews(userId, queryParams);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("/:id/config")
  async getConfig(@Param("id") examId: number): Promise<ExamDto> {
    const userId = this.request?.user.sub;

    return this.examService.getConfig(userId, examId);
  }

  @Public()
  @Get("/hash-id/:hashId/preview")
  async previewByHashId(@Param("hashId") hashId: string): Promise<PreviewExamDto> {
    return this.examService.previewByHashId(hashId);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("/:id/content")
  async getContent(@Param("id") examId: number): Promise<ExamDto> {
    const userId = this.request?.user.sub;

    return this.examService.getContent(userId, examId);
  }

  @ApiOperation({ summary: "For the students, retrieve exam content to exam without revealing the correct answer" })
  @ApiBearerAuth()
  @Roles([UserRole.STUDENT])
  @Get("/hash-id/:hashId/content")
  async getContentByHashId(@Param("hashId") hashId: string): Promise<GetExamContentByHashIdDto> {
    const userId = this.request?.user.sub;

    return this.examService.getContentByHashId(userId, hashId);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Post()
  async create(@Body() createExamDto: CreateExamDto): Promise<ExamDto> {
    const userId = this.request?.user?.sub;

    return this.examService.create(userId, createExamDto);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Post("/:id/publish")
  async publish(
    @Param("id") examId: number,
    @Body(new ValidationPipe({ whitelist: true })) updateExamDto: PublishExamDto
  ): Promise<ExamDto> {
    const userId = this.request?.user.sub;

    return this.examService.publish(userId, examId, updateExamDto);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Delete(":id")
  async remove(@Param("id") examId: number): Promise<void> {
    const userId = this.request?.user?.sub;

    return this.examService.remove(userId, examId);
  }
}
