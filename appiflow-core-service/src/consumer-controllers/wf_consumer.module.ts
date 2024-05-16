import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WFConsumerController } from './wf_consumer.controller';


@Module({
  //imports: [TypeOrmModule.forFeature([WorkflowAction])],
  controllers: [WFConsumerController],
  providers: [],
  exports: [],
})
export class WFConsumerModule {}