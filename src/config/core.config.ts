import { INestApplication } from '@nestjs/common'

export function setupCors(app: INestApplication) {
  app.enableCors({
    origin: [process.env.FRONT_END_URL],
    credentials: true,
  })
}
