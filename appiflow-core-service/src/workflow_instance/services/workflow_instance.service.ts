import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowInstance } from '../entities/workflow_instance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkflowInstanceService {
  constructor(@InjectRepository(WorkflowInstance) private readonly repo: Repository<WorkflowInstance>) { }

  public async getAll() {
    return await this.repo.find();
  }
}