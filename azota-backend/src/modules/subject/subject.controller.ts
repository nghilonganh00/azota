import { Controller, Get, Inject, Param } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { SubjectService } from "./subject.service";
import { Public } from "src/common/decorators/public.decorator";
import { SubjectDto } from "./dtos/subject.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Subject")
@Controller("subjects")
export class SubjectController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly subjectService: SubjectService
  ) {}

  @Public()
  @Get("grade/:gradeId")
  async getByGradeId(@Param("gradeId") gradeId: number): Promise<SubjectDto[]> {
    return this.subjectService.getByGradeId(gradeId);
  }
}
