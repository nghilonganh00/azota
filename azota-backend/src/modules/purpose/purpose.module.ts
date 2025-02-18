import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purpose } from "./purpose.entity";
import { PurposeController } from "./purpose.controller";
import { PurposeService } from "./purpose.service";

@Module({
  imports: [TypeOrmModule.forFeature([Purpose])],
  controllers: [PurposeController],
  providers: [PurposeService],
  exports: [PurposeService],
})
export class PurposeModule {}
