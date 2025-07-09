import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: parseInt(process.env.TIME_TO_LIVE ?? '60'), // Time to live (seconds)
          limit: parseInt(process.env.MAX_REQUEST ?? '10'), // Max number of requests within ttl
        },
      ],
    }),
  ],
  exports: [ThrottlerModule],
})
export class AppThrottlerModule {}
