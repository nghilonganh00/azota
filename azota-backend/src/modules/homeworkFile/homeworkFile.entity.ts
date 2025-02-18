import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Homework } from '../homework/homework.entity';

@Entity()
export class HomeworkFile extends BaseEntity {
  @Column()
  title: string;

  @Column()
  @IsNotEmpty()
  link: string;

  @ManyToOne(() => Homework, (homework) => homework.homeworkFiles)
  homework: Homework;
}
