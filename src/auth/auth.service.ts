import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // Validate user's credentials (username/phone and password)
  async validateUser(usernameOrPhone: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameOrPhone(
      usernameOrPhone,
    );

    if (user && user.password === pass) {
      // Return user without password if valid
      const { password, ...result } = user;
      return result;
    } else if (user && user.password !== pass) {
      throw new ForbiddenException('Incorrect Username Or Password');
    }

    return null; // User not found
  }

  // Sign in the user using JWT token
  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.usersService.findOneByUsernameOrPhone(
      user.email,
    );

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.login(userExists);
  }

  // Register a new user and then log them in
  async registerUser(user: User) {
    try {
      console.log(user);
      await this.usersService.create(user);

      return this.login(user);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  // Generate a JWT token for user after successful login
  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
