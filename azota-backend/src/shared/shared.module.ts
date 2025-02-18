import { TypeOrmModule } from "@nestjs/typeorm";
import { Homework } from "src/modules/homework/homework.entity";
import { SharedService } from "./shared.service";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Homework])],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
