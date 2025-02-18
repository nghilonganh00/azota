import { Entity, Column, BeforeInsert, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Question } from '../question/question.entity';

@Entity()
export class Option extends BaseEntity {
  @Column({ length: 1 })
  @IsNotEmpty()
  key: string;

  @Column()
  @IsNotEmpty()
  content: string;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
