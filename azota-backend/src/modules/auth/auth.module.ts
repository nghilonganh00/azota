import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { User } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { StudentModule } from "../student/student.module";
import { TeacherModule } from "../teacher/teacher.module";
import { GoogleStrategy } from "./strategies/google.strategy";
import { jwtConstants } from "src/config/jwt.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "15d" },
    }),
    UserModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
