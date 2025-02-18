import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserRole } from "src/shared/constant";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  findByPk(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOne(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  create(
    username: string,
    password: string,
    fullName: string,
    role: UserRole
  ): Promise<User | null> {
    const user = this.userRepository.create({ username, password, fullName });

    return this.userRepository.save(user);
  }

  async registerRole(id: number, newRole: UserRole): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error("User not found");
    }

    user.role = newRole;

    await this.userRepository.save(user);

    return user;
  }
}
