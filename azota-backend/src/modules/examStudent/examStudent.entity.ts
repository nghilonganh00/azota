import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { Exam } from "../exam/exam.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";

@Entity()
export class ExamStudent extends BaseEntity {
  @ManyToOne(() => Exam, (exam) => exam.examStudents)
  exam: Exam;

  @ManyToOne(() => StudentClass, (studentClass) => studentClass.examStudents)
  studentClass: StudentClass;
}
