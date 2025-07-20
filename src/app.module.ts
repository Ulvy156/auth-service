import { Module } from '@nestjs/common';
import { EnvModule } from './config/env.module';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvModule, KafkaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
