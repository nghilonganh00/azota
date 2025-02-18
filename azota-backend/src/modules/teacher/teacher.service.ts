import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./teacher.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { UserService } from "../user/user.service";
import { UserRole } from "src/shared/constant";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,

    private userService: UserService
  ) {}

  async findOne(conditions: Record<string, any>): Promise<Teacher | null> {
    return await this.teacherRepository.findOneBy(conditions);
  }

  async register(userId: number): Promise<void> {
    const teacher = await this.findOne({ userId });

    if (!teacher) {
      await this.create(userId);
    }

    this.userService.registerRole(userId, UserRole.TEACHER);
  }

  async create(userId: number): Promise<void> {
    const newTeacher = this.teacherRepository.create({ userId });

    await this.teacherRepository.save(newTeacher);
  }
}
