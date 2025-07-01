import { Teacher } from "src/modules/teacher/teacher.entity";

export class TeacherPermissionDto {
  id: number;
  principalId: number;
  teacherId: number;
  permissionId: number;
  teacher: Teacher
}