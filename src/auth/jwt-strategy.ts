import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      secretOrKey: process.env.SECRET_KEY, // Secret key for verifying the JWT signature
      ignoreExpiration: false, // Validate token expiration (default: true)
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub, // User ID from JWT payload
      email: payload.email, // User email from JWT payload
      phoneNumber: payload.phoneNumber, // User phone number from JWT payload
    };
  }
}
