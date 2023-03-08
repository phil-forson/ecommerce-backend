import { Controller, Post, Request, UseGuards, Get} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async getProfile(@Request() req) {
      return req.user;
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async auth() {}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Request() req) {
      return this.authService.signIn(req.user)
    }
}
