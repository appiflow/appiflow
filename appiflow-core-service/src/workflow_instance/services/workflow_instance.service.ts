import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowInstance } from '../entities/workflow_instance.entity';
import { WorkflowInstanceParams } from '../entities/workflow_instance_params.entity';

import { Repository } from 'typeorm';

@Injectable()
export class WorkflowInstanceService {
  constructor(@InjectRepository(WorkflowInstance) private readonly repo: Repository<WorkflowInstance>,
  @InjectRepository(WorkflowInstanceParams) private readonly params_repo: Repository<WorkflowInstanceParams>) { }

  public async getAll() {
    return await this.repo.find();
  }

  public async getParamById(id: string) {
    return await this.params_repo.findOneBy({workflow_instance_id: id});
  }

  public async create(workflowInstance: WorkflowInstance) {
    return this.repo.create(workflowInstance);
  }

  public async createParams(workflowInstanceParams: WorkflowInstanceParams) {
    return this.params_repo.create(workflowInstanceParams);
  }

  public async updateStatus(status: string, id: string) {
    await this.repo.createQueryBuilder()
            .update(WorkflowInstance)
            .set({ status:status })
            .where("id = :id", { id: id })
            .execute()
  }
}