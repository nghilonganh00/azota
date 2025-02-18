import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classgroup } from "./classgroup.entity";
import { ClassgroupDto } from "./classgroup.dto";
import { REQUEST } from "@nestjs/core";
import { TeacherService } from "../teacher/teacher.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { GetStudentClassIdDto } from "./dtos/get-studentClassId.dto";

@Injectable()
export class ClassgroupsService {
  constructor(
    @InjectRepository(Classgroup)
    private classgroupsRepository: Repository<Classgroup>,

    @Inject(REQUEST)
    private readonly request: any,

    private teacherService: TeacherService
  ) {}

  async getByTeacher(userId: number): Promise<Classgroup[]> {
    const classgroups = await this.classgroupsRepository.find({
      where: {
        teacher: { userId },
      },
      relations: ["classrooms"],
    });

    if (!classgroups) {
      throw new UnauthorizedException("No classgroups found for this teacher");
    }

    return classgroups;
  }

  async findOne(id: number): Promise<Classgroup | null> {
    if (id === undefined || id === null) {
      return null;
    }

    return await this.classgroupsRepository.findOneBy({ id });
  }

  async getStudentClassIds(userId: number): Promise<GetStudentClassIdDto[]> {
    const teacher = await this.teacherService.findOne({ userId });
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }

    const classgroups = await this.classgroupsRepository
      .createQueryBuilder("classgroup")
      .leftJoinAndSelect("classgroup.classrooms", "classroom")
      .leftJoin("classroom.studentClasses", "studentClass")
      .addSelect("studentClass.id")
      .where("classgroup.teacherId = :teacherId", { teacherId: teacher.id })
      .getMany();

    return plainToInstance(GetStudentClassIdDto, classgroups);
  }

  async create(classgroupDto: ClassgroupDto): Promise<ClassgroupDto | null> {
    const userId = this.request["user"]["sub"];

    const teacher = await this.teacherService.findOne({ userId });

    if (!teacher) {
      throw new UnauthorizedException(`This teacher isn't exist`);
    }

    const newClassgroup = this.classgroupsRepository.create({
      classgroupName: classgroupDto.classgroupName,
      teacher,
    });

    const savedClassgroup = await this.classgroupsRepository.save(newClassgroup);

    return plainToClass(ClassgroupDto, savedClassgroup);
  }

  async delete(id: number): Promise<void> {
    const result = await this.classgroupsRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Classgroup with ID ${id} not found`);
    }
  }
}
