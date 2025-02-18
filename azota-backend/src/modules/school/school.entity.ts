import { Entity, Column, BeforeInsert, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Teacher } from '../teacher/teacher.entity';

@Entity()
export class School extends BaseEntity {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teachers: Teacher[];
}
