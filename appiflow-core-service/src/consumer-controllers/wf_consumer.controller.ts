import { Controller, Get } from '@nestjs/common';
import { EventPattern, Transport, Payload } from '@nestjs/microservices';
import { Message } from 'src/common/models/message.model';

@Controller()
export class WFConsumerController{

    constructor(
        
    ) {
    }

    @EventPattern('workflow-topic', Transport.KAFKA)
    handleEvent(
        @Payload() payload: Message,
    ) {
        console.log("In handleevent")
        return "success";
    }
}