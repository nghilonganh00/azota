import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { SignInDto, SignUpDto, UserResponseDto } from "./auth.dto";
import { StudentService } from "../student/student.service";
import * as bcrypt from "bcrypt";
import { User } from "../user/user.entity";
import { TeacherService } from "../teacher/teacher.service";
import { plainToClass } from "class-transformer";
import { UserRole } from "src/shared/constant";
import { generateRandomString } from "src/shared/utils";
import { GoogleUserDto } from "./dtos/google-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  async login(
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string; user: UserResponseDto }> {
    const user = await this.userService.findOne(username);
    console.log("user: ", user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("The username or password isn't correct");
    }

    const payload = { sub: user.id, username: user.username };

    const userResponseDto = plainToClass(UserResponseDto, user);

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: "1h" });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: "7d" });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: userResponseDto,
    };
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    const { username, password, fullname, role, email } = signUpDto;

    const existedUser = await this.userService.findOne(username);

    if (existedUser) {
      throw new ConflictException("Username already exists");
    }

    const newUser = await this.userService.create({ username, password, fullname, role, email });

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
    return newUser;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.userService.findByPk(payload.sub);
      if (!user) {
        throw new NotFoundException("User not exist");
      }

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, username: payload.username },
        { expiresIn: "1h" }
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async validateGoogleUser(googleUser: GoogleUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.register({
      username: generateRandomString(20),
      password: generateRandomString(8),
      fullname: googleUser.fullname,
      role: UserRole.STUDENT,
      email: googleUser.email,
    });
  }

  async validateGoogleCallback(userId: number) {
    const user = await this.userService.findByPk(userId);

    const payload = { sub: user.id, username: user.username };

    const userResponseDto = plainToClass(UserResponseDto, user);

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: "1h" });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: "7d" });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: userResponseDto,
    };
  }
}
