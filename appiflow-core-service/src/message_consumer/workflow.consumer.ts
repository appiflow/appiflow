import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { Specification } from '@severlessworkflow/sdk-typescript';
import * as fs from 'fs';
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { Logger } from '@nestjs/common';

@Injectable()
export class WorkflowConsumer implements OnModuleInit {
    private logger = new Logger('WorkflowConsumer'); 
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService) { }
    topic_name: string = "workflow-topic"

    async onModuleInit() { 

        // Consume Data with Spcific topic

        await this.consumerService.consume(
            "workflow-topic",
            { topics: [this.topic_name] },
            {
                eachMessage: async({ topic, partition, message })=>{
                 this.logger.log("Consuming from workflow-topic")
                 this.logger.log({
                    value:message.value.toString(),
                    topic:topic.toString(),
                    partition:partition.toString(),
                 })
                 const workflow_json: string = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/appiflow/req3.json', 'utf8');
                 const workflow: Specification.Workflow = Specification.Workflow.fromSource(workflow_json);
                 const startState: string = workflow.start.toString()
                 const workflow_step_id: string = "";
                 //TODO create step in DB
                 //TODO Update status in DB
                 this.logger.log("start state ${startState}")
                 //push message
                 const publish_message: string = startState
                 this.producerProxyService.produce_step_message(publish_message)

                }

            }
        )
    }

}
