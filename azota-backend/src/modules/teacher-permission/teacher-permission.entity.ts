import { BaseEntity } from "src/common/mysql/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { Teacher } from "../teacher/teacher.entity";

@Entity()
export class TeacherPermission extends BaseEntity {

  @Unique(["principalId", "teacherId", "permissionId"])
 

  @Column()
  principalId: number;

  @Column()
  teacherId: number;

  @Column({ nullable: true })
  permissionId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherPermissions)
  @JoinColumn({ name: "principalId" })
  principal: Teacher;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherPermissions)
  @JoinColumn({ name: "teacherId" })
  teacher: Teacher;
}
