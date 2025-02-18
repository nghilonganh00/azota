import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Option } from "./option.entity";
import { Repository } from "typeorm";

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>
  ) {}

  async create(option: Option): Promise<Option> {
    try {
      const newOption = this.optionRepository.create(option);

      return await this.optionRepository.save(newOption);
    } catch (error) {
      console.log(error);
      if (error.code === "ER_NO_REFERENCED_ROW_2") {
        throw new NotFoundException("Exam not found");
      }
      throw error;
    }
  }
}
