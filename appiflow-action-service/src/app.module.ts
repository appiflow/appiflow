import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { WorkflowStepActionConsumer } from './message_consumer/step-action.consumer';
import { ProducerProxyService } from './message_producer/producer.proxyservice';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService, WorkflowStepActionConsumer, ProducerProxyService],
})
export class AppModule {}
