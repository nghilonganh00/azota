import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Grade } from "./grade.entity";
import { Repository } from "typeorm";
import { GradeDto } from "./dtos/grade.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>
  ) {}

  async getAll(): Promise<GradeDto[]> {
    const grades = await this.gradeRepository.find();

    return plainToInstance(GradeDto, grades);
  }
}
