import { Controller, Inject, Post } from "@nestjs/common";
import { StudentService } from "./student.service";
import { REQUEST } from "@nestjs/core";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Student")
@Controller("students")
export class StudentController {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly studentService: StudentService
  ) {}

  @ApiBearerAuth()
  @Post()
  async create() {}
}
