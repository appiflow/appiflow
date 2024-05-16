import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConsumerService } from "./message_consumer/consumer.service";
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();     
  const app = await NestFactory.create(AppModule
    );

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        }
      }
    });
    app.connectMicroservice(kafkaApp);
  await app.startAllMicroservices();
  const port = 3001;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
