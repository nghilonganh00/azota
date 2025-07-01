import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { TeacherPermissionService } from "./teacher-permission.service";
import { REQUEST } from "@nestjs/core";
import { TeacherPermissionDto } from "./dtos/teacher-permission.dto";

@Controller("teacher-permission")
export class TeacherPermissionController {
  constructor(
    private readonly teacherPermissionService: TeacherPermissionService,
    @Inject(REQUEST) private readonly request: any
  ) {}

  @Get("/teachers")
  async getTeachersByPrincipal(): Promise<TeacherPermissionDto[]> {
    const userId = this.request?.user?.sub;
    return this.teacherPermissionService.getTeachersByPrincipal(userId);
  }

  @Post("/register")
  async registerTeacher(@Body() { teacherEmail }: { teacherEmail: string }): Promise<TeacherPermissionDto> {
    const userId = this.request?.user?.sub;
    console.log("userId", userId);
    return this.teacherPermissionService.registerTeacher(userId, teacherEmail);
  }
}
