import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { SignInDto, SignUpDto, UserResponseDto } from "./auth.dto";
import { StudentService } from "../student/student.service";
import * as bcrypt from "bcrypt";
import { User } from "../user/user.entity";
import { TeacherService } from "../teacher/teacher.service";
import { plainToClass } from "class-transformer";
import { UserRole } from "src/shared/constant";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  async signIn(username: string, password: string): Promise<{ accessToken: string; user: UserResponseDto }> {
    const user = await this.userService.findOne(username);
    console.log(`username: ${username} password: ${password}`);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("The username or password isn't correct");
    }

    const payload = { sub: user.id, username: user.username };

    const userResponseDto = plainToClass(UserResponseDto, user);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: userResponseDto,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password, fullname, role } = signUpDto;

    const existedUser = await this.userService.findOne(username);

    if (existedUser) {
      throw new ConflictException("Username already exists");
    }

    const newUser = await this.userService.create(username, password, fullname, role);

    switch (role) {
      case UserRole.STUDENT:
        const newStudent = await this.studentService.create(newUser.id);
        break;
      case UserRole.TEACHER:
        const newTeacher = await this.teacherService.create(newUser.id);
        break;
      default:
        break;
    }
  }
}
