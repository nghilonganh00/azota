import { IsString, Matches, MinLength } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/[A-Z]/, { message: "Password must be at least one uppercase letter" })
  @Matches(/[a-z]/, { message: "Password must be at least one lowercase letter" })
  @Matches(/\d/, { message: "Password must contain at least one number" })
  @Matches(/[\W_]/, { message: "Password must contain at least one special character" })
  newPassword: string;

  @IsString()
  currentPassword: string;
}
