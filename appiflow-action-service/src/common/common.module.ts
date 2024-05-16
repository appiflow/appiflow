import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Message } from './models/message.model';
import { WorkflowSdkUtil, HandlerResult, ResultType } from './core/workflow_sdk_util';

@Module({
  imports: [TypeOrmModule.forFeature([Message, WorkflowSdkUtil])]
})
export class CommonModule {}