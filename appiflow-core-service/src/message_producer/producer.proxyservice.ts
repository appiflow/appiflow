import { Injectable } from "@nestjs/common";
import { ProducerService } from './producer.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProducerProxyService {

    private logger = new Logger('ProducerProxyService'); 

    constructor(private readonly producerService :ProducerService){}


    async produce_workflow_message(message: string) {
      this.logger.log("producing wf msg")
        await  this.producerService.produce({
            topic:'workflow-topic',
            messages:[{
              value: message
            }]
          })
    }

    async produce_step_message(message: string) {
        await  this.producerService.produce({
            topic:'workflow-step-topic',
            messages:[{
              value: message
            }]
          })
    }

    async produce_action_message(message: string) {
        await  this.producerService.produce({
            topic:'step-action-topic',
            messages:[{
              value: message
            }]
          })
    }

   



}
