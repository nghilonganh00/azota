import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassgroupsController } from "./classgroup.controller";
import { ClassgroupsService } from "./classgroup.service";
import { Classgroup } from "./classgroup.entity";
import { TeacherModule } from "../teacher/teacher.module";

@Module({
  imports: [TypeOrmModule.forFeature([Classgroup]), TeacherModule],
  controllers: [ClassgroupsController],
  providers: [ClassgroupsService],
  exports: [ClassgroupsService],
})
export class ClassgroupModule {}
