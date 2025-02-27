import { UserRole } from "src/shared/constant";

export class CreateUserDto {
  username: string;
  password: string;
  fullName: string;
  role: UserRole = UserRole.STUDENT;
  email?: string;
}
