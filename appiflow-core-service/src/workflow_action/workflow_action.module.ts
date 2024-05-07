import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowActionController } from './controllers/workflow_action.controller';
import { WorkflowAction } from './entities/workflow_action.entity';
import { WorkflowActionService } from './services/workflow_action.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowAction])],
  controllers: [WorkflowActionController],
  providers: [WorkflowActionService],
  exports: [WorkflowActionService],
})
export class WorkflowActionModule {}