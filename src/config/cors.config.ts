import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function getCorsConfig(): CorsOptions {
  return {
    origin: process.env.FRONT_END_URL ?? '',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
    credentials: true,
  };
}
