import { Injectable } from "@nestjs/common";
import { Purpose } from "./purpose.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PurposeDto } from "./dtos/purpose.dto";
import { plainToClass, plainToInstance } from "class-transformer";

@Injectable()
export class PurposeService {
  constructor(
    @InjectRepository(Purpose)
    private readonly purposeRepository: Repository<Purpose>
  ) {}

  async getAll(): Promise<PurposeDto[]> {
    try {
      const purposes = await this.purposeRepository.find();
      
      return plainToInstance(PurposeDto, purposes);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
