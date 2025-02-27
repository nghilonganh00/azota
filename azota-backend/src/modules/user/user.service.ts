import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserRole } from "src/shared/constant";
import { CreateUserDto } from "./dtos/create-user.dto";

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

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(createUser: CreateUserDto): Promise<User | null> {
    const user = this.userRepository.create({
      ...createUser,
    });

    return await this.userRepository.save(user);
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
