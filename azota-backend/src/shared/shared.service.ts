import { Global, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Homework } from "src/modules/homework/homework.entity";
import { Repository } from "typeorm";

@Global()
@Injectable()
export class SharedService {
  constructor(@InjectRepository(Homework) private homeworkRepository: Repository<Homework>) {}

  async findHomeworkByPk(homeworkId: number): Promise<Homework | null> {
    const homework = await this.homeworkRepository.findOneBy({
      id: homeworkId,
    });
    return homework;
  }
}
