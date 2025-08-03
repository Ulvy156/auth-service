import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { kafkaConfig } from './kafka/kafka.config';
import { setupCors } from './config/core.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupCors(app)
  //listen to KAFKA
  app.connectMicroservice(kafkaConfig);
  await app.startAllMicroservices();

  // extract cookies from header
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
