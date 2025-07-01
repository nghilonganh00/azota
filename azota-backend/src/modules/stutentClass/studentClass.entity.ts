import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { Student } from "../student/student.entity";
import { Classroom } from "../classroom/classroom.entity";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { HomeworkSubmission } from "../homeworkSubmission/homeworkSubmission.entity";
import { Gender, UserRole } from "src/shared/constant";
import { ExamStudent } from "../examStudent/examStudent.entity";
import { Unique } from "typeorm";

// Ensure that identificationNumber is unique within a classroom
@Unique(["classroomId", "identificationNumber"])

@Entity()
export class StudentClass extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @Column({ type: "enum", enum: Gender, default: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: "enum", enum: UserRole, default: UserRole.STUDENT })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ length: 15, nullable: true })
  @IsString()
  phone: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: "date", nullable: true })
  @IsDate()
  DOB: Date;

  @Column({ length: 6 })
  @IsNotEmpty()
  identificationNumber: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  confirmedAt: Date;

  @Column()
  @IsNotEmpty()
  classroomId: number;

  @Column({ nullable: true })
  studentId: number;

  @ManyToOne(() => Student, (student) => student.studentClasses)
  @JoinColumn({ name: "studentId" })
  student: Student;

  @ManyToOne(() => Classroom, (classroom) => classroom.studentClasses, {
    nullable: false,
  })
  @JoinColumn({ name: "classroomId" })
  classroom: Classroom;

  @OneToMany(() => HomeworkSubmission, (homeworkResult) => homeworkResult.studentClass)
  homeworkSubmissions: HomeworkSubmission[];

  @OneToMany(() => ExamStudent, (examStudent) => examStudent.studentClass)
  examStudents: ExamStudent[];
}
