import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import { Exam } from "../exam/exam.entity";
import { Student } from "../student/student.entity";

@Entity()
export class ExamResult extends BaseEntity {
  @Column()
  @IsNotEmpty()
  answer: string;

  @Column()
  @IsNotEmpty()
  startedAt: Date;

  @Column()
  savedAt: Date;

  @Column()
  @IsNotEmpty()
  studentId: number;

  @Column()
  @IsNotEmpty()
  examId: number;

  @ManyToOne(() => Exam, (exam) => exam.examResults)
  @JoinColumn({ name: "examId" })
  exam: Exam;

  @ManyToOne(() => Student, (student) => student.examResults)
  @JoinColumn({ name: "studentId" })
  student: Student;
}
