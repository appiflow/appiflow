export class Message {
    workflowInstanceId: string
    workflowStepId: string
    workflowStepName: string
    workflowActionId: string
    workflowActionName: string
    status: string
    timestamp: string

    toString(){
        return JSON.stringify(this);
    }
}

export function toJson(json: string){
    return JSON.parse(json);
}

