import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./subject.entity";
import { Repository } from "typeorm";
import { Grade } from "../grade/grade.entity";
import { GradeDto } from "../grade/dtos/grade.dto";
import { SubjectDto } from "./dtos/subject.dto";
import { plainToClass, plainToInstance } from "class-transformer";

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>
  ) {}

  async getByGradeId(gradeId: number): Promise<SubjectDto[]> {
    try {
      const subjects = await this.subjectRepository.findBy({ gradeId });

      return plainToInstance(SubjectDto, subjects);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
