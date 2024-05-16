import { Injectable } from '@nestjs/common';
import {Message, toJson} from "./common/models/message.model";
import { ProducerProxyService } from './message_producer/producer.proxyservice';

@Injectable()
export class AppService {
  constructor(private readonly producerProxyService :ProducerProxyService){}

  async getHello() {
    const msg: Message = new Message();
    msg.workflowInstanceId = "111"
    msg.status = "START"
    
    // Sending message
    console.log("wf ${workflow_instance_id}")
    await  this.producerProxyService.produce_workflow_message(msg)
    return 'Hello World!';
  }
}
