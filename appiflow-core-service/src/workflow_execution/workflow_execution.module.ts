import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowApiController } from './controllers/workflow_execution.controller';
import { WorkflowApiService } from './services/workflow_execution.service';
import { WorkflowInstanceService } from '../workflow_instance/services/workflow_instance.service';
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { ProducerService } from '../message_producer/producer.service';
import { WorkflowInstance } from '../workflow_instance/entities/workflow_instance.entity';
import { WorkflowInstanceParams } from '../workflow_instance/entities/workflow_instance_params.entity';
import { WorkflowStepParams } from '../workflow_step/entities/workflow_step_params.entity';
import { WorkflowStepService } from '../workflow_step/services/workflow_step.service';
import { WorkflowStep } from '../workflow_step/entities/workflow_step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowInstance, WorkflowInstanceParams,
    WorkflowStepParams, WorkflowStep])],
  controllers: [WorkflowApiController],
  providers: [WorkflowApiService, WorkflowInstanceService, ProducerProxyService, ProducerService,
    WorkflowStepService],
  exports: [],
})
export class WorkflowApiModule {}