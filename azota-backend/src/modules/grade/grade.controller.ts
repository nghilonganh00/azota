import { Controller, Get, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ApiTags } from "@nestjs/swagger";
import { GradeService } from "./grade.service";
import { Public } from "src/common/decorators/public.decorator";
import { GradeDto } from "./dtos/grade.dto";

@ApiTags("Grade")
@Controller("grades")
export class GradeController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private gradeService: GradeService
  ) {}

  @Public()
  @Get("")
  async getAll(): Promise<GradeDto[]> {
    return this.gradeService.getAll();
  }
}