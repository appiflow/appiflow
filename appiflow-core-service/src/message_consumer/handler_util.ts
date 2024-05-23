import { ProducerProxyService } from '../message_producer/producer.proxyservice';
import { WorkflowSdkUtil, HandlerResult, ResultType } from '../common/core/workflow_sdk_util';
import { WorkflowAction } from '../workflow_action/entities/workflow_action.entity';
import {Status} from "../common/core/common_enums";
import { WorkflowStep } from '../workflow_step/entities/workflow_step.entity';
import {Message, toJson} from "../common/models/message.model";
import { WorkflowActionService } from '../workflow_action/services/workflow_action.service';
import { WorkflowStepService } from '../workflow_step/services/workflow_step.service';
import { WorkflowStepParams } from '../workflow_step/entities/workflow_step_params.entity';
import { WorkflowActionParams } from '../workflow_action/entities/workflow_action_params.entity';
import { v4 } from "uuid";
import { Logger } from '@nestjs/common';

export class HandlerUtil{

   private logger = new Logger('HandlerUtil'); 
   constructor(
       private readonly producerProxyService: ProducerProxyService,
       private readonly workflowStepService: WorkflowStepService,
       private readonly workflowActionService: WorkflowActionService) { }

   async handle_workflow(workflowInstanceId: string,  result: HandlerResult, msg: Message, workflowStepParams: WorkflowStepParams){
    if(result.type == ResultType.STEP){
        const wfStep: WorkflowStep = new WorkflowStep()
        wfStep.workflow_step_id = v4();
        wfStep.status = Status.INITIATED.toString()
        wfStep.createdBy = "USER"
        wfStep.lastChangedBy = "USER"
        wfStep.workflow_instance_id = msg.workflowInstanceId
        wfStep.step_name = result.stepName
        await this.workflowStepService.create(wfStep);
        var stepParams: string = null;
        if(JSON.stringify(workflowStepParams.output_params) === '{}'){
            //output_params is null, take from input_params
            stepParams = workflowStepParams.input_params
        }
        else{
            stepParams = workflowStepParams.output_params
        }
        const workflowStepParamsNew: WorkflowStepParams = new WorkflowStepParams()
        workflowStepParamsNew.workflow_step_id = wfStep.workflow_step_id
        workflowStepParamsNew.createdBy = "USER"
        workflowStepParamsNew.lastChangedBy = "USER"
        workflowStepParamsNew.input_params = stepParams
        await this.workflowStepService.createParams(workflowStepParamsNew);
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
        workflowAction.createdBy = "USER"
        workflowAction.lastChangedBy = "USER"
        workflowAction.workflow_instance_id = msg.workflowInstanceId
        workflowAction.workflow_step_id = msg.workflowStepId
        workflowAction.action_name =  result.actionName
        await this.workflowActionService.create(workflowAction)
        if(msg.workflowActionId == null){
            //First action, copy params from current step input params
            const actionParams: WorkflowActionParams = new WorkflowActionParams()
            actionParams.workflow_action_id = workflowAction.workflow_action_id
            actionParams.input_params = workflowStepParams.input_params
            actionParams.createdBy = "USER"
            actionParams.lastChangedBy = "USER"
            await this.workflowActionService.createParams(actionParams);
        }
        else{
            //Not first action, copy params from current step output params
            const actionParams: WorkflowActionParams = new WorkflowActionParams()
            actionParams.workflow_action_id = workflowAction.workflow_action_id
            actionParams.input_params = workflowStepParams.output_params
            actionParams.createdBy = "USER"
            actionParams.lastChangedBy = "USER"
            await this.workflowActionService.createParams(actionParams);

        }
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