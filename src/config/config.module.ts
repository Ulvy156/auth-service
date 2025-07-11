import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: '.env',
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
