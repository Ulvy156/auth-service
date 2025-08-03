// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refresh_token, user, access_token } =
      await this.authService.validateUser(body.email, body.password);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true, // protect from JS access
      secure: false, // Set to true if using HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // Clear cookies after 7days
    });
    return {
      user,
      access_token,
    };
  }

  @Post('refresh-token')
  async refreshAccessToken(@Req() req) {
    const refreshToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }
    return await this.authService.refreshAccessToken(refreshToken);
  }
}
