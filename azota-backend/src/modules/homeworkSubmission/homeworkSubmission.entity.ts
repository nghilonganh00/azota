import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { Homework } from "../homework/homework.entity";
import { HomeworkSubmissionFile } from "../homeworkSubmissionFile/homeworkSubmissionFile.entity";
import { StudentClass } from "../stutentClass/studentClass.entity";

@Entity()
export class HomeworkSubmission extends BaseEntity {
  @Column({ nullable: true })
  comment: string;

  @Column({ default: false })
  isResend: boolean;

  @Column({ default: false })
  isShowPoint: boolean;

  @Column({ nullable: true })
  resendMessage: string;

  @Column({ nullable: true })
  point: string;

  @Column({ nullable: true })
  confirmedAt: Date;

  @ManyToOne(() => Homework, (homework) => homework.homeworkSubmissions)
  homework: Homework;

  @ManyToOne(() => StudentClass, (studentClass) => studentClass.homeworkSubmissions)
  studentClass: StudentClass;

  @OneToMany(() => HomeworkSubmissionFile, (file) => file.homeworkSubmission)
  files: HomeworkSubmissionFile[];
}
