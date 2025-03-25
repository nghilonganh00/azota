import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherPermission } from "./teacher-permission.entity";
import { TeacherPermissionController } from "./teacher-permission.controller";
import { TeacherPermissionService } from "./teacher-permission.service";

@Module({
  imports: [TypeOrmModule.forFeature([TeacherPermission])],
  controllers: [TeacherPermissionController],
  providers: [TeacherPermissionService],
  exports: [TeacherPermissionService],
})
export class TeacherPermissionModule {}
