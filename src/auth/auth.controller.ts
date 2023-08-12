import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

    // Authenticate user using local strategy (email/password)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    // Retrieve user profile using JWT authentication
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async getProfile(@Request() req) {
      return req.user;
    }

    // Initiate Google OAuth 2.0 authentication
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async auth() {
      // This method can be left empty as GoogleAuthGuard handles the redirection
    }

    // Handle Google OAuth 2.0 callback and sign in the user
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Request() req) {
      return this.authService.signIn(req.user);
    }
}
