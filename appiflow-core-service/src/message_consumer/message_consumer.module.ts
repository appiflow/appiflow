import { Module } from '@nestjs/common';import { KafkaModule } from '../kafka/kafka.module';
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { ConsumerService } from '../message_consumer/consumer.service';
import { WorkflowConsumer } from '../message_consumer/workflow.consumer';
import { WorkflowStepConsumer } from '../message_consumer/workflow-step.consumer';
import { WorkflowStepActionStatusConsumer } from '../message_consumer/step-action-status.consumer';
import { WorkflowStepActionConsumer } from '../message_consumer/step-action.consumer';
import { configService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkflowInstance } from '../workflow_instance/entities/workflow_instance.entity';
import {WorkflowStepModule} from '../workflow_step/workflow_step.module'
import {WorkflowInstanceModule} from '../workflow_instance/workflow_instance.module'
import {WorkflowActionModule} from '../workflow_action/workflow_action.module'

@Module({
  imports: [KafkaModule, WorkflowStepModule,  WorkflowInstanceModule, WorkflowActionModule],
  controllers: [],
  providers: [ProducerProxyService, 
    WorkflowConsumer, WorkflowStepConsumer, WorkflowStepActionStatusConsumer, WorkflowStepActionConsumer
    //, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, TestConsumer
   ],
})
export class MessageConsumerModule {}
