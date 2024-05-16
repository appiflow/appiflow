import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ProducerProxyService } from './message_producer/producer.proxyservice';
import { ConsumerService } from './message_consumer/consumer.service';
import { WorkflowConsumer } from './message_consumer/workflow.consumer';
import { WorkflowStepConsumer } from './message_consumer/workflow-step.consumer';
import { WorkflowStepActionStatusConsumer } from './message_consumer/step-action-status.consumer';
import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {MessageConsumerModule} from './message_consumer/message_consumer.module';
import {WorkflowApiModule} from './workflow_api/workflow_api.module'
import path from 'path';

import { WorkflowStepParams } from './workflow_step/entities/workflow_step_params.entity';
import { WorkflowStep } from './workflow_step/entities/workflow_step.entity';
import { WorkflowInstanceParams } from './workflow_instance/entities/workflow_instance_params.entity';
import { WorkflowInstance } from './workflow_instance/entities/workflow_instance.entity';
import { WorkflowActionParams } from './workflow_action/entities/workflow_action_params.entity';
import { WorkflowAction } from './workflow_action/entities/workflow_action.entity';
import {WorkflowStepModule} from './workflow_step/workflow_step.module'
import {WorkflowInstanceModule} from './workflow_instance/workflow_instance.module'
import {WorkflowActionModule} from './workflow_action/workflow_action.module'

@Module({
  imports: [KafkaModule,  MessageConsumerModule, WorkflowApiModule, WorkflowStepModule,  WorkflowInstanceModule, WorkflowActionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database:  configService.get('POSTGRES_DATABASE'),
        entities: [WorkflowStepParams, WorkflowStep, WorkflowInstanceParams,
          WorkflowInstance, WorkflowActionParams, WorkflowAction],
        //autoLoadEntities: true,
        synchronize: true,
        logging: ["query", "error"]
      }),
      
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService, ProducerProxyService, 
    //WorkflowConsumer, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, TestConsumer
   ],
})
export class AppModule {}
