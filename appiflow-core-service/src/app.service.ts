import { Injectable } from '@nestjs/common';
import { ProducerProxyService } from './message_producer/producer.proxyservice';
import { v4 } from "uuid";

@Injectable()
export class AppService {
  constructor(private readonly producerProxyService :ProducerProxyService){}

  async getHello() {
    const workflow_instance_id: string = v4();
    //TODO Save to DB
    //const message = '{workflow_instance_id: ${workflow_instance_id}}'
    const message = workflow_instance_id
    // Sending message
    console.log("wf ${workflow_instance_id}")
    await  this.producerProxyService.produce_workflow_message(message)

    return 'Hello World!';
  }
}
