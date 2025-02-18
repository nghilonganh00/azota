import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { StudentClassService } from "./studentClass.service";
import { StudentClassDto } from "./studentClass.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/shared/constant";
import { User } from "../user/user.entity";
import { QueryParamsDto } from "src/shared/dto";
import { Public } from "src/common/decorators/public.decorator";

@ApiTags("StudentClass")
@Controller("student-classes")
export class StudentClassController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly studentClassService: StudentClassService
  ) {}

  @Public()
  @Get("classroom/:classroomId")
  async getByClassroomId(
    @Param("classroomId") classroomId: number,
    @Query() query: QueryParamsDto
  ): Promise<StudentClassDto[]> {
    return this.studentClassService.getByClassroomId(classroomId);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("/homework/:homeworkId/submissions")
  async getSubmissionsByHomeworkId(
    @Param("homeworkId") homeworkId: number,
    @Query() query: QueryParamsDto
  ): Promise<StudentClassDto[]> {
    const userId = this.request?.user?.sub;

    return this.studentClassService.getSubmissionsByHomeworkId(userId, homeworkId, query);
  }

  @ApiBearerAuth()
  @Roles([UserRole.STUDENT])
  @Get("/:id/identify")
  async identify(@Param("id") studentClassId: number): Promise<StudentClassDto> {
    const userId = this.request?.user?.sub;

    return this.studentClassService.identify(userId, studentClassId);
  }

  @ApiBearerAuth()
  @Post()
  async create(@Body() studentClassDto: StudentClassDto) {
    const userId = this.request["user"]["sub"];

    return this.studentClassService.create(userId, studentClassDto);
  }

  @ApiOperation({ summary: "Create an anymous student class with (Tự do) classroom" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        fullname: { type: "string", example: "John Doe" },
      },
    },
    required: true,
  })
  @Public()
  @Post("/anonymous")
  async createAnonymous(@Body() reqBody: { fullname: string }): Promise<StudentClassDto> {
    const fullname = reqBody.fullname;

    return this.studentClassService.createAnonymous(fullname);
  }
}
