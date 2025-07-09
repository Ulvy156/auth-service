/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) throw new UnauthorizedException(); // Allow access to public routes

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req as any).user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
