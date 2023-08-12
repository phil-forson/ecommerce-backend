import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    // Import TypeOrmModule to access the User entity
    TypeOrmModule.forFeature([User]),
    
    // Configure Passport for authentication using JWT strategy
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // Configure JWTModule for generating and verifying tokens
    JwtModule.register({
      secret: process.env.SECRET_KEY, // Secret key for token encryption
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  
  // Declare the UserController as a controller within this module
  controllers: [UserController],
  
  // Provide the UserService to be used within the module
  providers: [UserService],
  
  // Export the UserService to be used by other modules that import this module
  exports: [UserService],
})
export class UserModule {}
