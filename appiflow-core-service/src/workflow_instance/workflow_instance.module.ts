import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowInstanceController } from './controllers/workflow_instance.controller';
import { WorkflowInstance } from './entities/workflow_instance.entity';
import { WorkflowInstanceService } from './services/workflow_instance.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowInstance])],
  controllers: [WorkflowInstanceController],
  providers: [WorkflowInstanceService],
  exports: [WorkflowInstanceService],
})
export class WorkflowInstanceModule {}