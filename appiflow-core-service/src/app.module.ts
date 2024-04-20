import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ProducerProxyService } from './message_producer/producer.proxyservice';
import { ConsumerService } from './message_consumer/consumer.service';
import { WorkflowConsumer } from './message_consumer/workflow.consumer';
import { WorkflowStepConsumer } from './message_consumer/workflow-step.consumer';
import { WorkflowStepActionStatusConsumer } from './message_consumer/step-action-status.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService, ProducerProxyService, WorkflowConsumer, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, TestConsumer
   ],
})
export class AppModule {}
