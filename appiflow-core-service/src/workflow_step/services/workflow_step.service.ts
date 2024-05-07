import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowStep } from '../entities/workflow_step.entity';
import {WorkflowStepParams } from '../entities/workflow_step_params.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkflowStepService {
  constructor(@InjectRepository(WorkflowStep) private readonly repo: Repository<WorkflowStep>,
  @InjectRepository(WorkflowStepParams) private readonly params_repo: Repository<WorkflowStepParams>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async create(workflowStep: WorkflowStep) {
    return this.repo.create(workflowStep);
  }

  public async createParams(workflowStepParams: WorkflowStepParams) {
    return this.params_repo.create(workflowStepParams);
  }

  public async updateStatus(status: string, id: string) {
    await this.repo.createQueryBuilder()
            .update(WorkflowStep)
            .set({ status:status })
            .where("id = :id", { id: id })
            .execute()
  }
}