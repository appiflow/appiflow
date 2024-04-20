import { Injectable } from "@nestjs/common";
import { ProducerService } from './producer.service';

@Injectable()
export class ProducerProxyService {

    constructor(private readonly producerService :ProducerService){}

    async produce_action_status_message(message: string) {
        await  this.producerService.produce({
            topic:'step-action-status-topic',
            messages:[{
              value: message
            }]
          })
    }

   



}
