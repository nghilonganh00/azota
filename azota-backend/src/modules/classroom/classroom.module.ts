import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom } from "./classroom.entity";
import { ClassroomController } from "./classroom.controller";
import { ClassroomService } from "./classroom.service";
import { forwardRef, Module } from "@nestjs/common";
import { ClassgroupModule } from "../classgroup/classgroup.module";
import { Homework } from "../homework/homework.entity";
import { HomeworkModule } from "../homework/homework.module";

@Module({
  imports: [TypeOrmModule.forFeature([Classroom, Homework]), ClassgroupModule, HomeworkModule],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
