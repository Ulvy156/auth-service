// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.validateUser(body.email, body.password);
  }

  @Post('refresh-token')
  async refreshAccessToken(@Req() req) {
    const refreshToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }
    return this.authService.refreshAccessToken(refreshToken);
  }
}
