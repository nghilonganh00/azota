import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { REQUEST } from "@nestjs/core";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserDto } from "./dtos/user.dto";
import { plainToClass } from "class-transformer";
import { UserRole } from "src/shared/constant";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("users")
export class UserController {
  constructor(
    @Inject(REQUEST)
    private readonly request: any,

    private userService: UserService
  ) {}

  @ApiBearerAuth()
  @Get()
  async findOne(): Promise<UserDto | null> {
    const userId = this.request["user"]["sub"];
    const user = await this.userService.findByPk(userId);
    return plainToClass(UserDto, user);
  }

  @ApiBearerAuth()
  @Get("remove-teacher-role")
  async removeTeacherRole(): Promise<void> {
    //Remove the Teacher role, will assigns them the Student role instead
    const userId = this.request["user"]["sub"];
    await this.userService.registerRole(userId, UserRole.STUDENT);
  }

  @ApiBearerAuth()
  @Patch()
  update(@Body() updateUser: UpdateUserDto): Promise<UserDto> {
    const userId = this.request?.user?.sub;

    return this.userService.validateUpdate(userId, updateUser);
  }

  @Patch("change-password")
  @HttpCode(204)
  changePassword(@Body() { currentPassword, newPassword }: { currentPassword: string; newPassword: string }) {
    const userId = this.request?.user?.sub;

    
  }
}
