import { Injectable, NotFoundException } from "@nestjs/common";
import { TeacherPermission } from "./teacher-permission.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherService } from "../teacher/teacher.service";
import { TeacherPermissionDto } from "./dtos/teacher-permission.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class TeacherPermissionService {
  constructor(
    @InjectRepository(TeacherPermission)
    private teacherPermissionRepository: Repository<TeacherPermission>,
    private teacherService: TeacherService
  ) {}

  async addTeacherPermission(userId: number, teacherId: number, permissionId?: number): Promise<TeacherPermission> {
    const existing = await this.teacherPermissionRepository.findOne({
      where: {
        principalId: userId,
        teacherId: teacherId,
        permissionId: permissionId ?? null,
      },
    });

    if (existing) {
      return existing;
    }

    const teacherPermission = this.teacherPermissionRepository.create({
      principalId: userId,
      teacherId: teacherId,
      permissionId: permissionId ?? null,
    });

    return this.teacherPermissionRepository.save(teacherPermission);
  }

  async getTeachersByPrincipal(userId: number): Promise<TeacherPermissionDto[]> {
    const principal = await this.teacherService.findOne({ userId: userId });
    if (!principal) {
      throw new NotFoundException("Principal not found");
    }

    const teacherPermissions = await this.teacherPermissionRepository
      .createQueryBuilder("tp")
      .leftJoinAndSelect("tp.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "user")
      .where("tp.principalId = :principalId", { principalId: principal.id })
      .groupBy("tp.teacherId")
      .getMany();

    return plainToInstance(TeacherPermissionDto, teacherPermissions);
  }

  async registerTeacher(userId: number, teacherEmail: string): Promise<TeacherPermissionDto> {
    const principal = await this.teacherService.findOne({ userId: userId });
    if (!principal) {
      throw new NotFoundException("Principal not found");
    }

    const teacher = await this.teacherService.findOneByEmail(teacherEmail);
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }

    const teacherPermission = await this.addTeacherPermission(principal.id, teacher.id);

    return plainToInstance(TeacherPermissionDto, teacherPermission);
  }
}
