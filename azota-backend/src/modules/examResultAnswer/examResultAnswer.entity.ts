import { Entity, Column, BeforeInsert, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Exam } from '../exam/exam.entity';
import { ExamResult } from '../examResult/examResult.entity';

@Entity()
export class ExamResultAnswer extends BaseEntity {
  @Column()
  answer: string;

  // @ManyToOne(() => ExamResult, (exaResult) => ExamResult.answers)
  // examResult: ExamResult;
}
