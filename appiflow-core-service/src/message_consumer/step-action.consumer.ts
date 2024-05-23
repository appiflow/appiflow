import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import {Message, toJson} from "../common/models/message.model";
import {Status} from "../common/core/common_enums";
import { WorkflowActionService } from '../workflow_action/services/workflow_action.service';
import { WorkflowAction } from '../workflow_action/entities/workflow_action.entity';
import { WorkflowActionParams } from '../workflow_action/entities/workflow_action_params.entity';
import { WorkflowStepService } from '../workflow_step/services/workflow_step.service';
import { WorkflowStepParams } from '../workflow_step/entities/workflow_step_params.entity';

@Injectable()
export class WorkflowStepActionConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService, 
        private readonly producerProxyService: ProducerProxyService,
        private readonly workflowActionService: WorkflowActionService,
        private readonly workflowStepService: WorkflowStepService) { }
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
                 const msg: Message = toJson(message.value.toString()) as Message
                
                 const workflowActionParams: WorkflowActionParams = await this.workflowActionService.getParamsById(msg.workflowActionId);
                 const inputParams: string = workflowActionParams.input_params;
                  //TODO Take action
                  const actionOutput: string =  "{\"applicant\": {\"age\": 75,\"gender\": \"male\",\"name\": \"John\"}}";
                  //merge action output with step input/output
                  const workflowStepParams: WorkflowStepParams = await this.workflowStepService.getParamsById(msg.workflowStepId)
                  var merged_params: string = null
                  if(JSON.stringify(workflowStepParams.output_params) === '{}'){
                    console.log("(workflowStepParams.input_params "+ workflowStepParams.input_params)
                    console.log("parse "+ JSON.parse(actionOutput))
                    console.log("parse3  "+ JSON.parse(workflowStepParams.input_params))
                    merged_params = Object.assign({}, JSON.parse(workflowStepParams.input_params), JSON.parse(actionOutput)) 
                 }
                 else{
                    console.log("(workflowStepParams.output_params¸ "+ workflowStepParams.output_params)
                    console.log("parse "+ JSON.parse(actionOutput))
                    console.log("parse3  "+ JSON.parse(workflowStepParams.output_params))
                    merged_params = Object.assign({}, JSON.parse(workflowStepParams.output_params), JSON.parse(actionOutput)) 
                 }
                 await this.workflowActionService.updateOutputParam(actionOutput, msg.workflowActionId)
                 await this.workflowStepService.updateOutputParam(merged_params, msg.workflowActionId);
                  const actionOutputObj = JSON.parse(actionOutput);
                 //JSON.parse(json);

                 const publishMessage: Message = new Message()
                publishMessage.workflowInstanceId = msg.workflowInstanceId
                publishMessage.workflowStepId = msg.workflowStepId
                publishMessage.status = Status.COMPLETED.toString()
                publishMessage.workflowStepName =msg.workflowActionName
                publishMessage.workflowActionId = msg.workflowActionId
                publishMessage.workflowStepName = msg.workflowStepName
                publishMessage.workflowActionName = msg.workflowActionName
                 this.producerProxyService.produce_action_status_message(publishMessage)
                }

            }
        )
    }




}