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
    return this.repo.save(workflowStep);
  }

  public async createParams(workflowStepParams: WorkflowStepParams) {
    return this.params_repo.save(workflowStepParams);
  }
  public async getParamsById(stepId: string) {
    return this.params_repo.findOneBy({workflow_step_id: stepId});
  }

  public async updateOutputParam(output_param: string, stepId: string) {
    return this.params_repo.update({workflow_step_id: stepId}, {output_params: output_param});
  }

  public async updateStatus(status: string, id: string) {
    await this.repo.createQueryBuilder()
            .update(WorkflowStep)
            .set({ status:status })
            .where("id = :id", { id: id })
            .execute()
  }
}