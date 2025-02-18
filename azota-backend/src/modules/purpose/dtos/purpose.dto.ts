import { Exclude } from "class-transformer";

export class PurposeDto {
  @Exclude()
  createdAt: Date;
}
