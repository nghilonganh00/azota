import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import { Exam } from "../exam/exam.entity";
import { Option } from "../option/option.entity";
import { QuestionPart } from "../questionPart/questionPart.entity";
import { QuestionType } from "src/shared/constant";

@Entity()
export class Question extends BaseEntity {
  @Column({ default: 0 })
  @IsNotEmpty()
  scorePerQuestion: number;

  @Column()
  @IsNotEmpty()
  rawIndex: number;

  @Column()
  @IsNotEmpty()
  topic: string;

  @Column({ type: "enum", enum: QuestionType, default: QuestionType.ESSAY })
  type: QuestionType;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  explain: string;

  @ManyToOne(() => Exam, (exam) => exam.questions)
  exam: Exam;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @ManyToOne(() => QuestionPart, (questionPart) => questionPart.questions)
  questionPart: QuestionPart;
}
