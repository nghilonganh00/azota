import { IsString, Matches, MinLength } from "class-validator";

export class changePasswordDto {
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/[A-Z]/)
  newPassword: string;

  @IsString()
  currentPassword: string;
}
