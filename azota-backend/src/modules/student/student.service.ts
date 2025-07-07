import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Student } from "./student.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>
  ) {}

  async findByIds(ids: number[]): Promise<Student[]> {
    return this.studentRepository.find({ where: { id: In(ids) } });
  }

  findOneByUserId(userId: number): Promise<Student> {
    const student = this.studentRepository.findOneBy({ userId });
    return student;
  }

  create(userId: number): Promise<Student | null> {
    const student = this.studentRepository.create({ userId });
    return this.studentRepository.save(student);
  }
}
