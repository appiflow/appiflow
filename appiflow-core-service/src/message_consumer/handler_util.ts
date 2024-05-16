import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { WorkflowSdkUtil, HandlerResult, ResultType } from '../common/core/workflow_sdk_util';
import { WorkflowAction } from '../workflow_action/entities/workflow_action.entity';
import {Status} from "../common/core/common_enums";
import { WorkflowStep } from '../workflow_step/entities/workflow_step.entity';
import {Message, toJson} from "../common/models/message.model";
import { WorkflowActionService } from '../workflow_action/services/workflow_action.service';
import { WorkflowStepService } from '../workflow_step/services/workflow_step.service';
import { v4 } from "uuid";
import { Logger } from '@nestjs/common';

export class HandlerUtil{

   private logger = new Logger('HandlerUtil'); 
   constructor(
       private readonly producerProxyService: ProducerProxyService,
       private readonly workflowStepService: WorkflowStepService,
       private readonly workflowActionService: WorkflowActionService) { }

   async handle_workflow(workflowInstanceId: string,  result: HandlerResult, msg: Message){
    if(result.type == ResultType.STEP){
        const wfStep: WorkflowStep = new WorkflowStep()
        wfStep.workflow_step_id = v4();
        wfStep.status = Status.INITIATED.toString()
        this.workflowStepService.create(wfStep);
        const publishMessage: Message = new Message()
        publishMessage.workflowInstanceId = msg.workflowInstanceId
        publishMessage.workflowStepId = wfStep.workflow_step_id 
        publishMessage.status = wfStep.status
        publishMessage.workflowStepName =result.stepName
        this.logger.log("Publishing Step " + publishMessage)
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
        publishMessage.workflowStepName =result.stepName
        publishMessage.workflowActionId = workflowAction.workflow_action_id
        publishMessage.workflowActionName = result.actionName
        this.logger.log("Publishing Action  " + publishMessage)
        this.producerProxyService.produce_action_message(publishMessage)
     }
     else if(result.type == ResultType.END){
      this.logger.log("End of workflow for workflowInstanceId: "+ workflowInstanceId)
      }
   }
}