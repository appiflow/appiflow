import { Injectable } from "@nestjs/common";
import { ProducerService } from './producer.service';
import {Message} from "../common/models/message.model";

@Injectable()
export class ProducerProxyService {

    constructor(private readonly producerService :ProducerService){}

    async produce_action_status_message(message: Message) {
        await  this.producerService.produce({
            topic:'step-action-status-topic',
            messages:[{
              value: message.toString()
            }]
          })
    }

   



}
