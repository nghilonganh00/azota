import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ExamResultService } from "./examResult.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/shared/constant";
import { REQUEST } from "@nestjs/core";
import { ExamResultDto } from "./dtos/examResult.dto";
import { CreateExamResultDto } from "./dtos/create-examResult.dto";
import { MarkExamResultDto } from "./dtos/mark-examResult.dto";
import { QueryParamsDto } from "src/shared/dto";
import { PreviewExamResultDto } from "./dtos/preview-examResult.dto";

@ApiTags("Exam Result")
@Controller("exam-results")
export class ExamResultController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly examResultService: ExamResultService
  ) {}

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("/:id/detail")
  async getById(@Param("id") examResultId: number): Promise<ExamResultDto> {
    const userId = this.request?.user?.sub;

    return this.examResultService.getById(userId, examResultId);
  }

  @ApiBearerAuth()
  @Get("/exam/:examId/student/:studentId/history")
  async getHistory(
    @Param("examId") examId: number,
    @Param("studentId") studentId: number
  ): Promise<PreviewExamResultDto[]> {
    const userId = this.request?.user?.sub;

    return this.examResultService.getHistory(userId, examId, studentId);
  }

  @ApiBearerAuth()
  @Roles([UserRole.STUDENT])
  @Get("/:id/score")
  async getScore(@Param("id") id: number): Promise<MarkExamResultDto> {
    const userId = this.request?.user?.sub;

    return this.examResultService.getScore(userId, id);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("/latest/exam/:examId/classroom/:classroomId")
  async getAllByExamId(
    @Query() queryParamsDto: QueryParamsDto,
    @Param("examId") examId: number,
    @Param("classroomId") classroomId: number
  ): Promise<ExamResultDto[]> {
    const userId = this.request?.user?.sub;

    return this.examResultService.getLatestOfStudentByExamAndClass(userId, examId, classroomId, queryParamsDto);
  }

  @ApiBearerAuth()
  @Roles([UserRole.STUDENT])
  @Post()
  async create(@Body() createExamResultDto: CreateExamResultDto): Promise<ExamResultDto> {
    const userId = this.request.user.sub;

    return this.examResultService.create(userId, createExamResultDto);
  }
}
