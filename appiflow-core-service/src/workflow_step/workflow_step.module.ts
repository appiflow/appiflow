import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowStepController } from './controllers/workflow_step.controller';
import { WorkflowStep } from './entities/workflow_step.entity';
import { WorkflowStepService } from './services/workflow_step.service';
import { WorkflowStepParams } from './entities/workflow_step_params.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowStep, WorkflowStepParams])],
  controllers: [WorkflowStepController],
  providers: [WorkflowStepService],
  exports: [WorkflowStepService],
})
export class WorkflowStepModule {}