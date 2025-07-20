// src/kafka/kafka.config.ts
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'auth-service-server',
      brokers: ['127.0.0.1:29092'], // Docker internal name
    },
    consumer: {
      groupId: 'auth-consumer-group',
    },
  },
};
