import { Controller, Get, Inject } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { ApiSecurity } from "@nestjs/swagger";
import { REQUEST } from "@nestjs/core";

@Controller("teachers")
export class TeacherController {
  constructor(
    @Inject(REQUEST)
    private readonly request: any,

    private teacherService: TeacherService
  ) {}

  @ApiSecurity("bearer")
  @Get("register")
  async register(): Promise<void> {
    const userId = this.request["user"]["sub"];

    return this.teacherService.register(userId);
  }
}
