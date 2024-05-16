import { Injectable } from '@nestjs/common';

import { WorkflowApiService } from '../services/workflow_api.service';
import * as fs from 'fs';
import { Controller, Get } from '@nestjs/common';


@Controller('workflow_runs')
export class  WorkflowApiController {
  constructor(
    private readonly workflowApiService: WorkflowApiService){}

    @Get()
    async start() {
      return this.workflowApiService.start();
  }
}
