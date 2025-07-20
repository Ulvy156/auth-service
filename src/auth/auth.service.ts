import {
  Injectable,
  Inject,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    console.info('Connecting to Kafka...');
    await new Promise((res) => setTimeout(res, 5000)); // wait Kafka bootup
    this.userClient.subscribeToResponseOf('validate.user');
    console.info('Subscribed to validate.user');
    await this.userClient.connect();
    console.info('Kafka connected');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await lastValueFrom(
      this.userClient
        .send('validate.user', { email, password })
        .pipe(timeout(10000)),
    );

    if (!user || !user.id) throw new UnauthorizedException('User Not Found');

    return this.generateToken(user.id, user.email);
  }

  async refreshAccessToken(refresh_token: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      console.error('Refresh token verification failed:', err);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    console.log(payload);
    return {
      access_token: {
        token: await this.generateAccessToken(payload.id, payload.email),
        expires_in: 900, // 15 minutes
      },
    };
  }

  async generateAccessToken(id: string, email: string) {
    return this.jwtService.sign(
      { sub: id, email },
      {
        secret: process.env.JWT_ACCESS_SECRET || 'default_secret_key',
        expiresIn: '15min',
      },
    );
  }

  async generateRefreshToken(id: string, email: string) {
    return this.jwtService.sign(
      { sub: id, email },
      {
        secret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_key',
        expiresIn: '7d',
      },
    );
  }

  async generateToken(id: string, email: string) {
    return {
      access_token: {
        token: await this.generateAccessToken(id, email),
        expires_in: 900, // 15 minutes
      },
      refresh_token: {
        token: await this.generateRefreshToken(id, email),
        expires_in: 604800, // 7 days
      },
    };
  }
}
