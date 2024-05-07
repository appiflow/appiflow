import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowAction } from '../entities/workflow_action.entity';
import { WorkflowActionParams } from '../entities/workflow_action_params.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkflowActionService {
  constructor(@InjectRepository(WorkflowAction) private readonly repo: Repository<WorkflowAction>,
  @InjectRepository(WorkflowActionParams) private readonly params_repo: Repository<WorkflowActionParams>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async create(workflowAction: WorkflowAction) {
    return this.repo.create(workflowAction);
  }

  public async createParams(workflowActionParams: WorkflowActionParams) {
    return this.params_repo.create(workflowActionParams);
  }

  public async updateStatus(status: string, id: string) {
    await this.repo.createQueryBuilder()
            .update(WorkflowAction)
            .set({ status:status })
            .where("id = :id", { id: id })
            .execute()
  }
}