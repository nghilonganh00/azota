import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty } from "class-validator";
import { Teacher } from "../teacher/teacher.entity";
import { HomeworkFile } from "../homeworkFile/homeworkFile.entity";
import { Classroom } from "../classroom/classroom.entity";
import { HomeworkSubmission } from "../homeworkSubmission/homeworkSubmission.entity";
import { generateRandomString } from "src/shared/utils";

@Entity()
export class Homework extends BaseEntity {
  @Column({ length: 8, unique: true })
  hashId: string;

  @BeforeInsert()
  generateHashId(): void {
    this.hashId = generateRandomString(8); // Automatically generate a unique UUID
  }

  @Column({ length: 8, unique: true })
  assignmentKey: string;

  @BeforeInsert()
  generateAssignmentKey(): void {
    this.assignmentKey = generateRandomString(8); // Automatically generate a unique UUID
  }

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: false })
  isShowResult: boolean;

  @Column({ default: false })
  isMustLogin: boolean;

  @Column({ default: false })
  isInTrash: boolean;

  @Column()
  @IsNotEmpty()
  classroomId: number;

  @Column()
  @IsNotEmpty()
  teacherId: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.homeworks, {
    nullable: false,
  })
  @JoinColumn({ name: "classroomId" })
  classroom: Classroom;

  @ManyToOne(() => Teacher, (teacher) => teacher.homework, { nullable: false })
  @JoinColumn({ name: "teacherId" })
  teacher: Teacher;

  @OneToMany(
    () => HomeworkSubmission,
    (homeworkResult) => homeworkResult.homework
  )
  homeworkSubmissions: HomeworkSubmission[];

  @OneToMany(() => HomeworkFile, (homeworkFile) => homeworkFile.homework)
  homeworkFiles: HomeworkFile[];
}
