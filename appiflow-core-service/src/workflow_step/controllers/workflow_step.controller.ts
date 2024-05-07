import { Controller, Get } from '@nestjs/common';


import { WorkflowStepService } from '../services/workflow_step.service';

@Controller('WorkflowSteps')
export class  WorkflowStepController {
  constructor(
    private readonly WorkflowStepService: WorkflowStepService) {}


  @Get()
  public async getAll() {
    return await this.WorkflowStepService.getAll();
  }
}
