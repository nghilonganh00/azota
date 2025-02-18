import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import { Exam } from "../exam/exam.entity";
import { Question } from "../question/question.entity";

@Entity()
export class QuestionPart extends BaseEntity {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  examId: number;

  @Column()
  @IsNotEmpty()
  rawIndex: number;

  @ManyToOne(() => Exam, (exam) => exam.questionParts)
  @JoinColumn({ name: "examId" })
  exam: Exam;

  @OneToMany(() => Question, (question) => question.questionPart)
  questions: Question[];
}
