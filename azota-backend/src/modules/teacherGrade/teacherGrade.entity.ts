import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Grade } from '../grade/grade.entity';

@Entity()
export class TeacherGrade extends BaseEntity {
  @ManyToOne(() => Teacher, (teacher) => teacher.teacherGrades)
  teacher: Teacher;

  @ManyToOne(() => Grade, (grade) => grade.teacherGrades)
  grade: Grade;
}
