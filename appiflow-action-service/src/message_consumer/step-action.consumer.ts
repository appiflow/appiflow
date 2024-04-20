import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ProducerProxyService } from '../message_producer/producer.proxyservice';

@Injectable()
export class WorkflowStepActionConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService) { }
    topic_name: string = "step-action-topic"

    async onModuleInit() { 

        // Consume Data with Spcific topic

        await this.consumerService.consume(
            "step-action-topic",
            { topics: [this.topic_name] },
            {
                eachMessage: async({ topic, partition, message })=>{
                 console.log("Consuming from ${this.topic_name}")
                 console.log({
                    value:message.value.toString(),
                    topic:topic.toString(),
                    partition:partition.toString(),
                 })
                 //TODO Take action
                 const publish_message: string = "Completed"
                 this.producerProxyService.produce_action_status_message(publish_message)
                }

            }
        )
    }




}