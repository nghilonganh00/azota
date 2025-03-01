import { IsNotEmpty } from "class-validator";
import { Gender } from "src/shared/constant";

export class UpdateUserDto {
  @IsNotEmpty()
  fullName: string;
  DOB: Date;
  email: string;
  phone: string;
  avatarURL: string;
  gender: Gender = Gender.MALE;
}
