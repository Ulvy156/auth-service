import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServerConfig } from './config/server.config';
import { setupMiddlewares } from './middleware/app.middleware';
import { setupPipes } from './config/pipes.config';
import { getCorsConfig } from './config/cors.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { ip, port } = getServerConfig();

  setupMiddlewares(app);

  app.enableCors(getCorsConfig());

  setupPipes(app);

  await app.listen(port, ip, () => {
    console.log(`Application is running on: http://${ip}:${port}`);
  });
}

void bootstrap();
