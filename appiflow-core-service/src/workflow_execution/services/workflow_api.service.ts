import { Injectable } from '@nestjs/common';
import { ProducerProxyService } from '../../message_producer/producer.proxyservice';
import { v4 } from "uuid";
import {Message} from "../../common/models/message.model";

import { WorkflowInstance } from '../../workflow_instance/entities/workflow_instance.entity';
import { WorkflowInstanceParams } from '../../workflow_instance/entities/workflow_instance_params.entity';
import { WorkflowInstanceService } from '../../workflow_instance/services/workflow_instance.service';
import * as fs from 'fs';
import { Controller, Get } from '@nestjs/common';
import { WorkflowStepService } from '../../workflow_step/services/workflow_step.service';
import { WorkflowStepParams } from '../../workflow_step/entities/workflow_step_params.entity';

@Injectable()
export class  WorkflowApiService {
  constructor(private readonly producerProxyService :ProducerProxyService,
    private readonly workflowInstanceService: WorkflowInstanceService,
    private readonly workflowStepService: WorkflowStepService){}

  async start() {
    const workflow_instance_id: string = v4();
    //TODO Save to DB
    const wfInstance: WorkflowInstance = new WorkflowInstance()
    wfInstance.workflow_instance_id = workflow_instance_id
    wfInstance.status = "INITIATED"
    wfInstance.createdBy = "USER"
    wfInstance.lastChangedBy = "USER"
    const wfInstanceNew: WorkflowInstance = await this.workflowInstanceService.create(wfInstance);
    console.log("Inserted id " + wfInstanceNew.id)
    //TODO remove hardcoding
    const workflow_json: string = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/repo/appiflow/req.json', 'utf8');
    const workflowInstanceParams: WorkflowInstanceParams = new WorkflowInstanceParams()
    workflowInstanceParams.workflow_instance_id = workflow_instance_id
    workflowInstanceParams.workflow_definition = workflow_json
    workflowInstanceParams.input_params = "<input_params>"
    workflowInstanceParams.createdBy = "USER"
    workflowInstanceParams.lastChangedBy = "USER"
   this.workflowInstanceService.createParams(workflowInstanceParams)
   const stepParams:WorkflowStepParams = new WorkflowStepParams()
   stepParams.workflow_step_id = v4();
   stepParams.input_params = "";

   //this.workflowStepService.createParams(stepParams);
    //const message = '{workflow_instance_id: ${workflow_instance_id}}'
    const msg: Message = new Message();
    msg.workflowInstanceId = workflow_instance_id
    msg.status = wfInstance.status
    
    // Sending message
    console.log("wf ${workflow_instance_id}")
    await  this.producerProxyService.produce_workflow_message(msg)
    //JSON.parse("""")
    //JSON.stringify()
    return 'Hello World!';
  }
}
