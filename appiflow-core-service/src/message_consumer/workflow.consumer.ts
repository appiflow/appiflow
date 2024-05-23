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
import { WorkflowStepParams } from '../workflow_step/entities/workflow_step_params.entity';
import { v4 } from "uuid";
import {Message, toJson} from "../common/models/message.model";
import {Status} from "../common/core/common_enums";

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
        console.log("Initializing workflow consumer")

        await this.consumerService.consume(
            "workflow-topic",
            { topics: [this.topic_name] },
            {
                eachMessage: async({ topic, partition, message })=>{
                 this.logger.log("Consuming from workflow-topic")
                 this.logger.log({
                    msgString:message.value.toString(),
                    topic:topic.toString(),
                    partition:partition.toString(),
                 })
    
                 //TODO Message parse
                 const msg: Message = toJson(message.value.toString()) as Message
                 
                 const workflowInstanceId = msg.workflowInstanceId;
                 const instanceParams: WorkflowInstanceParams = (await this.workflowInstanceService.getParamById(workflowInstanceId))
                 const workflowDefnJson: string = instanceParams.workflow_definition
                 this.logger.log("In workflow-topic consumer workflowInstanceId: "+workflowInstanceId )
                 const workflow: Specification.Workflow = Specification.Workflow.fromSource(workflowDefnJson);
                 const startState: string = workflow.start.toString()
                 
                 //TODO create step in DB
                 const wfStep: WorkflowStep = new WorkflowStep()
                 wfStep.workflow_step_id = v4();
                 wfStep.status = Status.INITIATED.toString()
                 wfStep.workflow_instance_id = workflowInstanceId
                 wfStep.step_name = startState
                 wfStep.createdBy = "USER"
                 wfStep.lastChangedBy = "USER"
                const wfStepCreated = await this.workflowStepService.create(wfStep);
                this.logger.log("step created "+ wfStepCreated.workflow_step_id)
                //create step params
                const wfStepParams: WorkflowStepParams = new WorkflowStepParams();
                wfStepParams.workflow_step_id = wfStep.workflow_step_id
                wfStepParams.createdBy = "USER"
                wfStepParams.lastChangedBy = "USER"
                wfStepParams.input_params = instanceParams.input_params
                await this.workflowStepService.createParams(wfStepParams);
                 //TODO Update status in DB
                 //this.workflowStepService.updateStatus(wfStep.workflow_step_id, )
                 this.logger.log("start state ${startState}")
                 const publishMessage: Message = new Message()
                 publishMessage.workflowInstanceId = msg.workflowInstanceId
                 publishMessage.workflowStepId = wfStep.workflow_step_id 
                 publishMessage.status = wfStep.status
                 publishMessage.workflowStepName =startState
                 //push message
                 this.producerProxyService.produce_step_message(publishMessage)

                }

            }
        )
    }

}
