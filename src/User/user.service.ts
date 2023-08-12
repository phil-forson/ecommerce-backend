import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find a user by username or phone number
  async findOneByUsernameOrPhone(
    usernameOrPhone: string,
  ): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .where(
        'user.phonenumber = :usernameOrPhone OR user.email = :usernameOrPhone',
        { usernameOrPhone },
      )
      .getOne();
  }

  // Retrieve all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find a user by ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Create a new user
  async create(user: User): Promise<any> {
    // Check if the user already exists
    const userExists = await this.findOneByUsernameOrPhone(
      user.email || user.phoneNumber,
    );
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    // Save the new user to the database
    return this.userRepository.save(user);
  }

  // Update user details
  async update(id: number, user: User): Promise<User> {
    // Update user data in the database
    await this.userRepository.update(id, user);
    // Retrieve the updated user
    return this.findOne(id);
  }

  // Remove a user
  async remove(id: number): Promise<void> {
    // Delete user from the database
    await this.userRepository.delete(id);
  }
}
