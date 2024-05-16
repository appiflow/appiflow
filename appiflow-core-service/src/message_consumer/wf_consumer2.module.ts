import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowConsumer } from './workflow.consumer';


@Module({
  //imports: [TypeOrmModule.forFeature([WorkflowAction])],
  controllers: [],
  providers: [WorkflowConsumer],
  exports: [],
})
export class WFConsumerModule {}