import { Entity, Column, BeforeInsert, TableInheritance, BeforeUpdate } from "typeorm";
import { BaseEntity } from "src/common/mysql/base.entity";
import { IsNotEmpty, Length, IsEmail, IsDate, IsEnum } from "class-validator";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { Gender, UserRole } from "src/shared/constant";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "userType" } })
export class User extends BaseEntity {
  @Column({ length: 50, unique: true })
  @IsNotEmpty()
  @Length(3, 50)
  username: string;

  @Column()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ length: 50 })
  @IsNotEmpty()
  fullName: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ type: "date", nullable: true })
  @IsDate()
  DOB: Date;

  @Column({ type: "enum", enum: Gender, default: Gender.MALE })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @Column({ nullable: true })
  avatarURL: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.STUDENT })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
