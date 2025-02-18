import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Classroom } from '../classroom/classroom.entity';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { IsNotEmpty } from 'class-validator';
import { Teacher } from '../teacher/teacher.entity';

@Entity()
export class Classgroup extends BaseEntity {
  @Column()
  @IsNotEmpty()
  classgroupName: string;

  @Column()
  @IsNotEmpty()
  teacherId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.classgroups, {
    nullable: false,
  })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @OneToMany(() => Classroom, (classroom) => classroom.classgroup)
  classrooms: Classroom[];
}
