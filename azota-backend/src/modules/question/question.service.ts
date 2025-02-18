import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Repository } from "typeorm";
import { QuestionType } from "src/shared/constant";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  async create(question: Question): Promise<Question> {
    try {
      const newQuestion = this.questionRepository.create({
        ...question,
      });

      return await this.questionRepository.save(newQuestion);
    } catch (error) {
      console.log(error);
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        throw new NotFoundException("Exam not found");
      }
      throw error;
    }
  }
}
