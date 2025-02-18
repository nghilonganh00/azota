import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Classgroup } from "../classgroup/classgroup.entity";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsInt, IsNotEmpty } from "class-validator";
import { Teacher } from "../teacher/teacher.entity";
import { ExamClass } from "../examClass/examClass.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";
import { Homework } from "../homework/homework.entity";

@Entity()
export class Classroom extends BaseEntity {
  @Column()
  @IsNotEmpty()
  className: string;

  @Column({ length: 4, nullable: true })
  classYear: string;

  @Column()
  @IsInt()
  teacherId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.classrooms, {
    nullable: false,
  })
  @JoinColumn({ name: "teacherId" })
  teacher: Teacher;

  @ManyToOne(() => Classgroup, (classgroup) => classgroup.classrooms, {
    nullable: false,
  })
  classgroup: Classgroup;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.classroom)
  studentClasses: StudentClass[];

  @OneToMany(() => Homework, (homework) => homework.classroom)
  homeworks: Homework[];

  @OneToMany(() => ExamClass, (examClass) => examClass.classroom)
  examClasses: ExamClass[];
}
