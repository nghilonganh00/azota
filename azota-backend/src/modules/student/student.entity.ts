import { Entity, OneToOne, JoinColumn, OneToMany, Column } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { User } from "../user/user.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";
import { ExamResult } from "../examResult/examResult.entity";

@Entity()
export class Student extends BaseEntity {
  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.student)
  studentClasses: StudentClass[];

  @OneToMany(() => ExamResult, (examResult) => examResult.student)
  examResults: ExamResult[];
}
