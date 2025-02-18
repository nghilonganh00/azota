import { Entity, Column, BeforeInsert, OneToOne, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import {
  HomeworkSubmission,
} from "../homeworkSubmission/homeworkSubmission.entity";

@Entity()
export class HomeworkSubmissionFile extends BaseEntity {
  @Column()
  title: string;

  @Column()
  @IsNotEmpty()
  link: string;

  @ManyToOne(() => HomeworkSubmission, (homeworkResult) => homeworkResult.files)
  homeworkSubmission: HomeworkSubmission
}
