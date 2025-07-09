// src/app-imports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import ormconfig from './config/database.config';
import { AppThrottlerModule } from './throttler/throttler.module';
import { JwtConfig } from './config/jwt.config';

// All feature modules

@Module({
  imports: [
    AppConfigModule,
    JwtConfig,
    AppThrottlerModule,
    TypeOrmModule.forRoot(ormconfig),
    // Grouped features
  ],
})
export class AppImportsModule {}
