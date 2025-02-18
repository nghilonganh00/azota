import { Entity, Column, BeforeInsert, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Exam } from '../exam/exam.entity';
import { Classroom } from '../classroom/classroom.entity';

@Entity()
export class ExamClass extends BaseEntity {
  @ManyToOne(() => Exam, (exam) => exam.examClasses, { eager: true })
  exam: Exam;

  @ManyToOne(() => Classroom, (classroom) => classroom.examClasses, {
    eager: true,
  })
  classroom: Classroom;
}
