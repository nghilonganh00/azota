import { BaseEntity } from "src/common/mysql/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Permission extends BaseEntity {
  @Column()
  name: string;
}
