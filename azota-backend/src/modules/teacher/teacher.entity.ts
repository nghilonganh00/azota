import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { User } from "../user/user.entity";
import { Classroom } from "../classroom/classroom.entity";
import { Exam } from "../exam/exam.entity";
import { Homework } from "../homework/homework.entity";
import { School } from "../school/school.entity";
import { TeacherGrade } from "../teacherGrade/teacherGrade.entity";
import { TeacherSubject } from "../teacherSubject/teacherSubject.entity";
import { Classgroup } from "../classgroup/classgroup.entity";

@Entity()
export class Teacher extends BaseEntity {
  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => School, (school) => school.teachers)
  school: School;

  @OneToMany(() => TeacherGrade, (teacherGrade) => teacherGrade.teacher)
  teacherGrades: TeacherGrade[];

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.teacher)
  teacherSubjects: TeacherSubject[];

  @OneToMany(() => Classgroup, (classgroup) => classgroup.teacher)
  classgroups: Classgroup[];

  @OneToMany(() => Classroom, (classroom) => classroom.teacher)
  classrooms: Classroom[];

  @OneToMany(() => Exam, (exam) => exam.teacher)
  exams: Exam[];

  @OneToMany(() => Homework, (homework) => homework.teacher)
  homework: Homework[];
}
