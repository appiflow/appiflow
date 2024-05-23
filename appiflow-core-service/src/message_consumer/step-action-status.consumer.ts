import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { Specification } from '@severlessworkflow/sdk-typescript';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { WorkflowStepService } from '../workflow_step/services/workflow_step.service';
import { WorkflowInstanceService } from '../workflow_instance/services/workflow_instance.service';
import { WorkflowStep } from '../workflow_step/entities/workflow_step.entity';
import {Message, toJson} from "../common/models/message.model";
import { WorkflowSdkUtil, HandlerResult, ResultType } from '../common/core/workflow_sdk_util';
import { WorkflowActionService } from '../workflow_action/services/workflow_action.service';
import { WorkflowAction } from '../workflow_action/entities/workflow_action.entity';
import { WorkflowActionParams } from '../workflow_action/entities/workflow_action_params.entity';
import { WorkflowStepParams } from '../workflow_step/entities/workflow_step_params.entity';
import { v4 } from "uuid";
import {Status} from "../common/core/common_enums";
import {HandlerUtil} from "./handler_util";

@Injectable()
export class WorkflowStepActionStatusConsumer implements OnModuleInit {
    private logger = new Logger('WorkflowStepActionStatusConsumer'); 
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService,
        private readonly workflowStepService: WorkflowStepService,
        private readonly workflowInstanceService: WorkflowInstanceService,
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
                 const msg: Message = toJson(message.value.toString()) as Message
                                
                const workflowInstanceId = msg.workflowInstanceId;
                const workflowDefnJson: string = (await this.workflowInstanceService.getParamById(workflowInstanceId)).workflow_definition
                this.logger.log("In topic " + this.topic_name + " consumer workflowInstanceId: "+workflowInstanceId +" stepName: "+ msg.workflowStepName+" actionName: "+ msg.workflowActionName)
                
                const workflow: Specification.Workflow = Specification.Workflow.fromSource(workflowDefnJson);
               
                 //TODO update step status in DB
                 //this.workflowStepService.updateStatus();
                 const workflowStepParams: WorkflowStepParams = await this.workflowStepService.getParamsById(msg.workflowStepId);
                 const stepOutputParams: string = workflowStepParams.output_params
                 const workflowSdk = new WorkflowSdkUtil(workflowDefnJson, stepOutputParams);
                 
                
                 const result: HandlerResult = workflowSdk.handle_action( msg.workflowStepName, msg.workflowActionName);
                 this.logger.log("Result after handler is : "+ result.toString())

                 const handler: HandlerUtil = new HandlerUtil(this.producerProxyService, this.workflowStepService, 
                    this.workflowActionService);
                 handler.handle_workflow(workflowInstanceId, result, msg, workflowStepParams)

                 /* if(result.type == ResultType.STEP){
                    const wfStep: WorkflowStep = new WorkflowStep()
                    wfStep.workflow_step_id = v4();
                    wfStep.status = Status.INITIATED.toString()
                    this.workflowStepService.create(wfStep);
                    const publishMessage: Message = new Message()
                    publishMessage.workflowInstanceId = msg.workflowInstanceId
                    publishMessage.workflowStepId = wfStep.workflow_step_id 
                    publishMessage.status = wfStep.status
                    publishMessage.workflowStepName =result.stepName
                    this.producerProxyService.produce_step_message(publishMessage)
                 }
                 else if(result.type == ResultType.ACTION){
                    const workflowAction: WorkflowAction = new WorkflowAction()
                    workflowAction.workflow_action_id = v4();
                    workflowAction.status = Status.INITIATED.toString()
                    this.workflowActionService.create(workflowAction)
                    const publishMessage: Message = new Message()
                    publishMessage.workflowInstanceId = msg.workflowInstanceId
                    publishMessage.workflowStepId = msg.workflowStepId 
                    publishMessage.status = workflowAction.status
                    publishMessage.workflowStepName =result.actionName
                    publishMessage.workflowActionId = workflowAction.workflow_action_id
                    this.producerProxyService.produce_action_message(publishMessage)
                 }
                 else if(result.type == ResultType.END){
                    this.logger.log("End of workflow for workflowInstanceId: "+workflowInstanceId)
                } */
                }

            }
        )
    }




}