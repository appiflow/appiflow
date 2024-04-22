import { Controller, Get } from '@nestjs/common';


import { WorkflowInstanceService } from '../services/workflow_instance.service';

@Controller('workflowinstances')
export class  WorkflowInstanceController {
  constructor(
    private readonly workflowInstanceService: WorkflowInstanceService) {}


  @Get()
  public async getAll() {
    return await this.workflowInstanceService.getAll();
  }
}
