import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { HomeworkService } from "./homework.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/shared/constant";
import { QueryParamsDto } from "src/shared/dto";
import { Homework } from "./homework.entity";
import { Public } from "src/common/decorators/public.decorator";
import { createHomeworkResDto, HomeworkDto } from "./dto/homework.dto";
import { UpdateHomeworkReq } from "./dto/updateHomework.dto";

@ApiTags("Homework")
@Controller("homeworks")
export class HomeworkController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private homeworkService: HomeworkService
  ) {}

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Get()
  async findAll(@Query() query: QueryParamsDto): Promise<HomeworkDto[]> {
    const userId = this.request?.user?.sub;

    return this.homeworkService.findAll(userId, query);
  }

  @Public()
  @Get("/hash/:hashId")
  async findByHashId(@Param("hashId") hashId: string): Promise<HomeworkDto> {
    return this.homeworkService.findByHashId(hashId);
  }

  @Get(":id")
  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  async findOne(@Param("id") homeworkId: number): Promise<Homework> {
    return this.homeworkService.findOne(homeworkId);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Post()
  async create(@Body() homeworkDto: HomeworkDto): Promise<createHomeworkResDto[]> {
    const userId = this.request?.user?.sub;

    const { homeworkFiles, ...homeworkData } = homeworkDto;
    console.log("homeworkFiles: " + homeworkFiles);

    return this.homeworkService.create(userId, homeworkDto);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Put(":id")
  async update(@Param("id") homeworkId: number, @Body() updateHomeworkReq: UpdateHomeworkReq): Promise<HomeworkDto> {
    const userId = this.request?.user?.sub;

    return this.homeworkService.update(userId, homeworkId, updateHomeworkReq);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Patch("/:id/content")
  async updateContent(@Param("id") homeworkId: number, @Body() { content }: { content: string }): Promise<HomeworkDto> {
    const userId = this.request?.user?.sub;

    return this.homeworkService.updateContent(userId, homeworkId, content);
  }

  @ApiBearerAuth()
  @Roles([UserRole.TEACHER])
  @Delete("/:id")
  async remove(@Param("id") homeworkId: number): Promise<void> {
    const userId = this.request?.user?.sub;

    return this.homeworkService.remove(userId, homeworkId);
  }
}
