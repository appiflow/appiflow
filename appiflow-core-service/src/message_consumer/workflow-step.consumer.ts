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
export class WorkflowStepConsumer implements OnModuleInit {
    private logger = new Logger('WorkflowStepConsumer'); 
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService,
        private readonly workflowStepService: WorkflowStepService,
        private readonly workflowInstanceService: WorkflowInstanceService,
        private readonly workflowActionService: WorkflowActionService) { }
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
                //TODO Message parse
                const msg: Message = toJson(message.value.toString()) as Message
                                
                const workflowInstanceId = msg.workflowInstanceId;
                const workflowDefnJson: string = (await this.workflowInstanceService.getParamById(workflowInstanceId)).workflow_definition
                this.logger.log("In topic " + this.topic_name +" consumer workflowInstanceId: "+workflowInstanceId +" stepName: "+ msg.workflowStepName)
                const workflow: Specification.Workflow = Specification.Workflow.fromSource(workflowDefnJson);
                const workflowStepParams: WorkflowStepParams = await this.workflowStepService.getParamsById(msg.workflowStepId);
                const inputParams: string = workflowStepParams.input_params
                 //TODO update step status in DB
                 //this.workflowStepService.updateStatus();
                 const workflowSdk = new WorkflowSdkUtil(workflowDefnJson, inputParams);
                 const result: HandlerResult = await workflowSdk.handle_step( msg.workflowStepName);
                 const handler: HandlerUtil = new HandlerUtil(this.producerProxyService, this.workflowStepService, 
                    this.workflowActionService);
                 handler.handle_workflow(workflowInstanceId, result, msg, workflowStepParams)
                
                
                }

            }
        )
    }




}