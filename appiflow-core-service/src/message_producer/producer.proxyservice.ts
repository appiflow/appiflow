import { Injectable } from "@nestjs/common";
import { ProducerService } from './producer.service';
import { Logger } from '@nestjs/common';
import {Message} from "../common/models/message.model";

@Injectable()
export class ProducerProxyService {

    private logger = new Logger('ProducerProxyService'); 

    constructor(private readonly producerService :ProducerService){}


    async produce_workflow_message(message: Message) {
      this.logger.log("producing wf msg")
        await  this.producerService.produce({
            topic:'workflow-topic',
            messages:[{
              value: message.toString()
            }]
          })
    }

    async produce_step_message(message: Message) {
        await  this.producerService.produce({
            topic:'workflow-step-topic',
            messages:[{
              value: message.toString()
            }]
          })
          this.logger.log("producing step msg")
    }

    async produce_action_message(message: Message) {
        await  this.producerService.produce({
            topic:'step-action-topic',
            messages:[{
              value: message.toString()
            }]
          })
    }

    async produce_action_status_message(message: Message) {
      await  this.producerService.produce({
          topic:'step-action-status-topic',
          messages:[{
            value: message.toString()
          }]
        })
  }

   



}
