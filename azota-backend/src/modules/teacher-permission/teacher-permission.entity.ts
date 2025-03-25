import { BaseEntity } from "src/common/mysql/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Teacher } from "../teacher/teacher.entity";

@Entity()
export class TeacherPermission extends BaseEntity {
  @Column()
  principalId: number;

  @Column()
  teacherId: number;

  @Column()
  permissionId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherPermissions)
  @JoinColumn({ name: "principalId" })
  principal: Teacher;
}
