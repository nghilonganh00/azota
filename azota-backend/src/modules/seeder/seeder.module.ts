import { Module } from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { Grade } from "../grade/grade.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purpose } from "../purpose/purpose.entity";
import { Permission } from "../permission/permission.entity";
import { School } from "../school/school.entity";
import { Classgroup } from "../classgroup/classgroup.entity";
import { Subject } from "../subject/subject.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Purpose, Permission, School, Classgroup, Subject])],
  providers: [SeederService],
})
export class SeederModule {}
