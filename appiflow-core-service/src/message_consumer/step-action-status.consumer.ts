import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { Specification } from '@severlessworkflow/sdk-typescript';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { WorkflowActionService } from '../workflow_action/services/workflow_action.service';

@Injectable()
export class WorkflowStepActionStatusConsumer implements OnModuleInit {
    private logger = new Logger('WorkflowStepActionStatusConsumer'); 
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService,
        private readonly workflowActionService: WorkflowActionService) { }
    topic_name: string = "step-action-status-topic"

    async onModuleInit() { 

        // Consume Data with Spcific topic

        await this.consumerService.consume(
            "step-action-status-topic",
            { topics: [this.topic_name] },
            {
                eachMessage: async({ topic, partition, message })=>{
                 this.logger.log("Consuming from ${this.topic_name}")
                 this.logger.log({
                    value:message.value.toString(),
                    topic:topic.toString(),
                    partition:partition.toString(),
                 })
                 //TODO update step status in DB
                 //this.workflowActionService.updateStatus()
                 //Complete workflow
                }

            }
        )
    }




}