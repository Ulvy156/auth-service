// src/kafka/kafka.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthKafkaController {
  @MessagePattern('notify-auth') // 👈 topic from another service
  handleSomething(@Payload() data: any) {
    console.log('[AuthService] Received:', data); // do something...
  }
}
