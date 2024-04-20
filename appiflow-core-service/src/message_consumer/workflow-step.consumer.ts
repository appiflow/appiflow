import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { Specification } from '@severlessworkflow/sdk-typescript';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

@Injectable()
export class WorkflowStepConsumer implements OnModuleInit {
    private logger = new Logger('WorkflowStepConsumer'); 
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService) { }
    topic_name: string = "workflow-step-topic"

    async onModuleInit() { 

        // Consume Data with Spcific topic

        await this.consumerService.consume(
            "workflow-step-topic",
            { topics: [this.topic_name] },
            {
                eachMessage: async({ topic, partition, message })=>{
                 this.logger.log("Consuming from workflow-step-topic")
                 this.logger.log({
                    value:message.value.toString(),
                    topic:topic.toString(),
                    partition:partition.toString(),
                 })
                 //TODO update step status in DB
                 const workflow_json: string = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/appiflow/req3.json', 'utf8');
                 const workflow: Specification.Workflow = Specification.Workflow.fromSource(workflow_json);
                 const startState: string = message.value.toString()
                 this.logger.log("startState "+ message.value.toString())
                 const startingState = workflow.states.find((state) => state.name === startState)

                 const ops: Specification.Operationstate = startingState as Specification.Operationstate;
                 const act1: Specification.Action = ops.actions[0] as Specification.Action
                 const fnref: Specification.Functionref = act1.functionRef as Specification.Functionref
                 const publish_message: string = fnref.refName
                 this.producerProxyService.produce_action_message(publish_message)
                }

            }
        )
    }




}