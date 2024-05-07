import { Injectable } from '@nestjs/common';
import { ProducerProxyService } from './message_producer/producer.proxyservice';
import { v4 } from "uuid";

import { WorkflowInstance } from './workflow_instance/entities/workflow_instance.entity';
import { WorkflowInstanceParams } from './workflow_instance/entities/workflow_instance_params.entity';
import { WorkflowInstanceService } from './workflow_instance/services/workflow_instance.service';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(private readonly producerProxyService :ProducerProxyService,
    private readonly workflowInstanceService: WorkflowInstanceService){}

  async getHello() {
    const workflow_instance_id: string = v4();
    //TODO Save to DB
    const wfInstance: WorkflowInstance = new WorkflowInstance()
    wfInstance.workflow_instance_id = workflow_instance_id
    wfInstance.status = "INITIATED"
    this.workflowInstanceService.create(wfInstance);
    const workflow_json: string = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/appiflow/req3.json', 'utf8');
    const workflowInstanceParams: WorkflowInstanceParams = new WorkflowInstanceParams()
    workflowInstanceParams.workflow_instance_id = workflow_instance_id
    workflowInstanceParams.workflow_definition = workflow_json
    this.workflowInstanceService.createParams(workflowInstanceParams)
    //const message = '{workflow_instance_id: ${workflow_instance_id}}'
    const message = workflow_instance_id
    // Sending message
    console.log("wf ${workflow_instance_id}")
    await  this.producerProxyService.produce_workflow_message(message)
    //JSON.parse("""")
    //JSON.stringify()
    return 'Hello World!';
  }
}
