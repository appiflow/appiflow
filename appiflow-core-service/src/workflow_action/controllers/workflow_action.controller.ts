import { Controller, Get } from '@nestjs/common';
import { WorkflowActionService } from '../services/workflow_action.service';

@Controller('WorkflowActions')
export class  WorkflowActionController {
  constructor(
    private readonly WorkflowActionService: WorkflowActionService) {}


  @Get()
  public async getAll() {
    return await this.WorkflowActionService.getAll();
  }
}
