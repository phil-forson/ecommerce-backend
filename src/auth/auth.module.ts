import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local-strategy';
import { JwtStrategy } from './jwt-strategy';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import * as dotenv from 'dotenv'
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { GoogleStrategy } from './google-strategy';

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy,GoogleStrategy, LocalAuthGuard, JwtAuthGuard, GoogleAuthGuard, UserService],
  
  controllers: [AuthController],
})
export class AuthModule {}
