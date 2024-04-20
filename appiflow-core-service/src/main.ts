import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsumerService } from "./message_consumer/consumer.service";
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();     
  const app = await NestFactory.create(AppModule
    );
  const port = 3001;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
