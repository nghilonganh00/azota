import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/mysql/base.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Grade } from '../grade/grade.entity';
import { Subject } from '../subject/subject.entity';

@Entity()
export class TeacherSubject extends BaseEntity {
  @ManyToOne(() => Teacher, (teacher) => teacher.teacherSubjects)
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.teacherSubject)
  subject: Subject;
}
