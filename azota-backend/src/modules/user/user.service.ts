import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserRole } from "src/shared/constant";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
import { plainToInstance } from "class-transformer";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findByPk(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
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

  async validateUpdate(userId: number, updateUser: UpdateUserDto): Promise<UserDto> {
    try {
      const { fullName, DOB, email, phone, gender, avatarURL } = updateUser;

      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException("User not found");
      }

      if (email && user.email !== email && (await this.isEmailRegistered(email))) {
        throw new BadRequestException("Email is already in use");
      }

      user.fullName = fullName ?? user.fullName;
      user.DOB = DOB ?? user.DOB;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;
      user.gender = gender ?? user.gender;
      user.avatarURL = avatarURL ?? user.avatarURL;

      const savedUser = await this.userRepository.save(user);
      return plainToInstance(UserDto, savedUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async validateChangePassword(userId: number, currentPassword: string, newPassword: string) {
    try {
      const user = await this.findByPk(userId);
      if (!user) {
        throw new NotFoundException("User not authenticated");
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException("Current password is incorrect");
      }

      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
