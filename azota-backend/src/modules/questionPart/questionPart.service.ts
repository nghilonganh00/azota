import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionPart } from "./questionPart.entity";
import { Repository } from "typeorm";
import { CreateQuestionPartDto } from "./dtos/create-questionPart.dto";
import { raw } from "mysql2";

@Injectable()
export class QuestionPartService {
  constructor(
    @InjectRepository(QuestionPart)
    private readonly questionPartRepository: Repository<QuestionPart>
  ) {}

  async create(questionPart: CreateQuestionPartDto): Promise<QuestionPart> {
    try {
      const newQuestionPart = this.questionPartRepository.create(questionPart);

      const savedQuestionPart = await this.questionPartRepository.save(newQuestionPart);

      return savedQuestionPart;
    } catch (error) {
      console.log(error);
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        throw new NotFoundException("Exam not found");
      }
      throw error;
    }
  }
}
