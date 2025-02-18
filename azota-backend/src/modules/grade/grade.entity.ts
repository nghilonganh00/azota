import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import { Subject } from "../subject/subject.entity";
import { Exam } from "../exam/exam.entity";
import { TeacherGrade } from "../teacherGrade/teacherGrade.entity";

@Entity()
export class Grade extends BaseEntity {
  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Exam, (exam) => exam.grade)
  exams: Exam[];

  @OneToMany(() => Subject, (subject) => subject.grade)
  subjects: Subject[];

  @OneToMany(() => TeacherGrade, (teacherGrade) => teacherGrade.grade)
  teacherGrades: TeacherGrade[];
}
