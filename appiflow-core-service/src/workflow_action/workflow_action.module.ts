import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowActionController } from './controllers/workflow_action.controller';
import { WorkflowAction } from './entities/workflow_action.entity';
import { WorkflowActionService } from './services/workflow_action.service';
import { WorkflowActionParams } from './entities/workflow_action_params.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowAction, WorkflowActionParams])],
  controllers: [WorkflowActionController],
  providers: [WorkflowActionService],
  exports: [WorkflowActionService],
})
export class WorkflowActionModule {}