/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'true' || true,
  logging: process.env.DB_LOGGING === 'true' || false,
  autoLoadEntities: true, // Loads all columns dynamically
  extra: {
    // Set global query timeout in milliseconds (1 hour = 3600000 ms)
    requestTimeout: 3600000, // 1 hour timeout
  },
};

export default ormconfig;
