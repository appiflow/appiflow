import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { Specification } from '@severlessworkflow/sdk-typescript';
import * as fs from 'fs';
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { Logger } from '@nestjs/common';

import { WorkflowStep } from '../workflow_step/entities/workflow_step.entity';
import { WorkflowStepService } from '../workflow_step/services/workflow_step.service';
import { WorkflowInstanceParams } from '../workflow_instance/entities/workflow_instance_params.entity';
import { WorkflowInstanceService } from '../workflow_instance/services/workflow_instance.service';
import { v4 } from "uuid";

@Injectable()
export class WorkflowConsumer implements OnModuleInit {
    private logger = new Logger('WorkflowConsumer'); 
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService,
        private readonly workflowStepService: WorkflowStepService,
        private readonly workflowInstanceService: WorkflowInstanceService) { }
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
                 //TODO Message parse
                 const workflowInstanceId = "";
                 const workflowDefnJson: string = (await this.workflowInstanceService.getParamById(workflowInstanceId)).workflow_definition
                 
                 const workflow: Specification.Workflow = Specification.Workflow.fromSource(workflow_json);
                 const startState: string = workflow.start.toString()
                 const workflow_step_id: string = "";
                 //TODO create step in DB
                 const wfStep: WorkflowStep = new WorkflowStep()
                 wfStep.workflow_step_id = v4();
                 wfStep.status = "INITIATED"
                this.workflowStepService.create(wfStep);
                 //TODO Update status in DB
                 //this.workflowStepService.updateStatus(wfStep.workflow_step_id, )
                 this.logger.log("start state ${startState}")
                 //push message
                 const publish_message: string = startState
                 this.producerProxyService.produce_step_message(publish_message)

                }

            }
        )
    }

}
