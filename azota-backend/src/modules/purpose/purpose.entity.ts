import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import { Exam } from "../exam/exam.entity";

@Entity()
export class Purpose extends BaseEntity {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  position: number;

  @Column({ default: -1 })
  @IsNotEmpty()
  semester: number;

  @OneToMany(() => Exam, (exam) => exam.purpose)
  exams: Exam[];
}
