import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { kafkaConfig } from './kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //listen to KAFKA
  app.connectMicroservice(kafkaConfig);
  await app.startAllMicroservices();

  // extract cookies from header
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
