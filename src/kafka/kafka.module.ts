// src/kafka/kafka.module.ts
import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-service-server',
            brokers: ['127.0.0.1:29092'], // Docker internal name
          },
          consumer: {
            groupId: 'auth-consumer-group',
            allowAutoTopicCreation: true,
          },
          subscribe: {
            fromBeginning: true,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule], // key fix to avoid export errors
})
export class KafkaModule {}
