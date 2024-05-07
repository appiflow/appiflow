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
import { WorkflowInstanceModule } from './workflow_instance/workflow_instance.module';
import { WorkflowInstance } from './workflow_instance/entities/workflow_instance.entity';
import { WorkflowInstanceService } from './workflow_instance/services/workflow_instance.service';

@Module({
  imports: [KafkaModule,  
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, WorkflowInstanceService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [WorkflowInstance],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    WorkflowInstanceModule
  ],
  controllers: [AppController],
  providers: [AppService, ProducerProxyService, WorkflowConsumer, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, WorkflowStepConsumer, WorkflowStepActionStatusConsumer
    //, TestConsumer
   ],
})
export class AppModule {}
