import { Controller, Get } from '@nestjs/common';
import { WorkflowInstanceService } from '../services/workflow_instance.service';

@Controller('WorkflowActions')
export class  WorkflowInstanceController {
  constructor(
    private readonly WorkflowInstanceService: WorkflowInstanceService) {}


  @Get()
  public async getAll() {
    return await this.WorkflowInstanceService.getAll();
  }
}
