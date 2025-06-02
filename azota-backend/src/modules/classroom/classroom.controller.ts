import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ClassroomService } from "./classroom.service";
import { ApiBearerAuth, ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/shared/constant";
import { QueryParamsDto } from "src/shared/dto";
import { ClassroomWithHomeworksDto } from "./dto/classroomIncludeHomework.dto";
import { ClassroomDto } from "./dto/classroom.dto";
import { HomeworkMustLoginGuard } from "src/common/guards/homeworkMustLogin.guard";

@ApiTags("Classroom")
// @UseInterceptors(LoggingInterceptor)
@Controller("classrooms")
export class ClassroomController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private classroomService: ClassroomService
  ) {}
  @ApiParam({
    name: "classroomId",
    example: 1,
  })
  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get(":classroomId/students")
  async getStudentsByClassroomId(@Param("classroomId") classroomId: number) {
    const userId = this?.request["user"]["sub"];

    return this.classroomService.getDetailStudentsByClassroomId(userId, classroomId);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get("/homeworks")
  async getHomeworks(@Query() query: QueryParamsDto): Promise<ClassroomWithHomeworksDto[]> {
    const userId = this.request?.user?.sub;

    return this.classroomService.getHomeworks(userId, query);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Post()
  async create(@Body() classroomDto: ClassroomDto): Promise<ClassroomDto> {
    const userId = this.request["user"]["sub"];

    return this.classroomService.create(userId, classroomDto);
  }

  // @ApiBearerAuth()
  // @Roles([UserRole.TEACHER])
  // @Get("/:classroomId/exam/:examId/")
}
