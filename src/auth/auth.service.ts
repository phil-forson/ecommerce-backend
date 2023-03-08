import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameOrEmail(
      usernameOrEmail,
    );
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.usersService.findOneByUsernameOrEmail(
      user.email,
    );

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.login(userExists);
  }

  async registerUser(user: User) {
    try {
      console.log(user);
      await this.usersService.create(user);

      return this.login(user);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
