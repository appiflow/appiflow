import { Injectable } from '@nestjs/common';

import { WorkflowApiService } from '../services/workflow_execution.service';
import * as fs from 'fs';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { WorkflowInstanceDTO } from '../models/workflow_instance_dto';

@Controller('workflow_runs')
export class  WorkflowApiController {
  constructor(
    private readonly workflowApiService: WorkflowApiService){}

    @Get()
    async start() {
      return this.workflowApiService.start();
    }
    @Post()
    async create_wf_instance(@Body() workflowInstanceDTO: WorkflowInstanceDTO) {
      return this.workflowApiService.create_wf_instance(workflowInstanceDTO);
    }
}
