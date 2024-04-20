import { Module } from '@nestjs/common';
import { ProducerService } from '../message_producer/producer.service';
import { ConsumerService } from '../message_consumer/consumer.service';

@Module({
    providers:[ProducerService, ConsumerService],
    exports:[ProducerService, ConsumerService]
})

@Module({})
export class KafkaModule {}
