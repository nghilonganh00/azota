import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionPart } from "./questionPart.entity";
import { QuestionPartController } from "./questionPart.controller";
import { QuestionPartService } from "./questionPart.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionPart])],
  controllers: [QuestionPartController],
  providers: [QuestionPartService],
  exports: [QuestionPartService],
})
export class QuestionPartModule {}
