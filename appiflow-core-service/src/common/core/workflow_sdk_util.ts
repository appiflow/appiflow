import * as fs from 'fs';
import { Specification } from '@severlessworkflow/sdk-typescript';
import {
  actionBuilder,
  databasedswitchstateBuilder,
  defaultconditiondefBuilder,
  functionBuilder,
  functionrefBuilder,
  operationstateBuilder,
  transitiondataconditionBuilder,
  workflowBuilder
} from '@severlessworkflow/sdk-typescript';

export class ActionMessage{
  step_name: string;
  action_name: string
}

export class Params{
  constructor(inputExpr, outputExpr){}
  inputExpr: string;
  outputExpr: string;
}

export class HandlerResult{
    type: ResultType
    stepName: string;
    actionName: string

    toString(){
      return "{type: " + this.type + "stepName: " + this.stepName + "actionName: " + this.actionName + "}";
    }
  }

  export enum ResultType{
    STEP = "STEP",
    ACTION = "ACTION",
    END = "END"
  }


export class WorkflowSdkUtil{
    workflow: Specification.Workflow | null;
    constructor(workflowJson: string){
        this.workflow = Specification.Workflow.fromSource(workflowJson);
    }

  step_queue: string[] = []
  action_queue: ActionMessage[] = []

  publish_step(step_name: string){
    console.log("Published Step with step "+ step_name )
    this.step_queue.push(step_name);
  }

  publish_action(step_name: string, action_name: string){
    const msg: ActionMessage = new ActionMessage();
    msg.action_name = action_name
    msg.step_name = step_name
    console.log("Published Action with step "+ msg.step_name + " action "+ msg.action_name)
    this.action_queue.push(msg);
  }

  consume_step(){
    const stepName: string = this.step_queue.shift();
    if(stepName == null){
      console.log("Action Q empty");
    }
    else{
      console.log("Consumed Step "+ stepName)
    }
    return stepName
  }

  consume_action(){
    const actMsg: ActionMessage = this.action_queue.shift();
    if(actMsg == null){
      console.log("Action Q empty");
    }
    else{
      console.log("Consumed Action with step "+ actMsg.step_name + " action "+ actMsg.action_name)
    }
    return actMsg
  }

  async getWf(){
    const workflow_json: string = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/repo/jsons/booklending.json', 'utf8');
    return workflow_json;
  }

  getStartNode(workflow: Specification.Workflow){
    return workflow.states[0];
  }

  getNextStepName(stepName: string){
    var nextStepName: string | null = null;
    const currentStep = this.workflow.states.find((state) => state.name === stepName)
   
    const ops: Specification.Operationstate = currentStep as Specification.Operationstate;
    

    if(ops.transition != null && ops.transition instanceof Specification.Transition){
      const transition:Specification.Transition = ops.transition as Specification.Transition
      //TODO handle producing events
      nextStepName = transition.nextState
    }
    else{
      nextStepName = ops?.transition?.toString()!
    }
    
    return nextStepName;
  }

  getFirstAction(step){
    const ops: Specification.Operationstate = step as Specification.Operationstate;

    return ops.actions?.[0];
  }

  getStepParams(step){
    var params: Params | null = null;
    if (step instanceof Specification.Operationstate){
      const ops: Specification.Operationstate = step as Specification.Operationstate;
      if(ops.stateDataFilter != null){
         params = new Params(ops.stateDataFilter.input, ops.stateDataFilter.output)
      }
    }
    else if(step instanceof Specification.Databasedswitchstate){
      const dbs: Specification.Databasedswitchstate = step as Specification.Databasedswitchstate;
      if(dbs.stateDataFilter != null){
         params = new Params(dbs.stateDataFilter.input, dbs.stateDataFilter.output)
      }
    }
    else if(step instanceof Specification.Parallelstate){
      const ps: Specification.Parallelstate = step as Specification.Parallelstate;
      if(ps.stateDataFilter != null){
         params = new Params(ps.stateDataFilter.input, ps.stateDataFilter.output)
      }
    }

    //TODO evaulate expressions to get params
    return params;

  }

  getActionDataFilter(action){
    const act: Specification.Action = action as Specification.Action
    const fromStateData: string = act.actionDataFilter?.fromStateData!
    const toStateData: string = act.actionDataFilter?.toStateData!
    const results: string = act.actionDataFilter?.results!
    const useResults: boolean = act.actionDataFilter?.useResults!

    //TODO evaluate to get data
  }

  getStepByName(stepName: string){
    const matchingState = this.workflow.states.find((state) => state.name === stepName)
    return matchingState;
  }

  getOperationStateNextAction(step, actionName: string){
    const currentStep: Specification.Operationstate =  step as Specification.Operationstate;
      var matchingIdx= -1;
      var nextActionName: string | null = null;
      const ops: Specification.Operationstate = currentStep as Specification.Operationstate;
      if(ops.actionMode != "sequential"){
        //Parallel mode will not have next action
        return nextActionName;
      }
      for (let index = 0; index < ops.actions?.length!; index++) {
        const act: Specification.Action = ops.actions?.[index] as Specification.Action
        if(act.name == actionName){
          
          matchingIdx = index
          break;
        }
      }
      
      matchingIdx = matchingIdx + 1
      if( matchingIdx < ops.actions?.length!){
        const act: Specification.Action =  ops.actions?.[matchingIdx] as Specification.Action
        
        nextActionName = act.name!
      }
      return nextActionName;

    }

    handle_action(stepName: string, actionName: string){

    const currentStep = this.getStepByName(stepName)
    const result: HandlerResult = new HandlerResult();
    
    if (currentStep instanceof Specification.Operationstate){
      const nextActionName = this.getOperationStateNextAction(currentStep, actionName)
       
      if( nextActionName == null){
        const nextStepName = this.getNextStepName(stepName)
        if(nextStepName == null){
            //TODO end of workflow
            console.log("nextStepName is null End of workflow")
            result.type = ResultType.END
        }
        else{
          
             //TODO publish step    
             this.publish_step(nextStepName); 
             result.stepName = nextStepName
             result.type = ResultType.STEP
        }
        
      }
      else{
        //TODO publish action
        this.publish_action(stepName, nextActionName);
        result.stepName = stepName
        result.actionName = nextActionName
        result.type = ResultType.ACTION
      }
    }
    else if (currentStep instanceof Specification.Parallelstate){
      const actions = this.getParallelActions(currentStep)
      //TODO check if other actions complete
      console.log("parallel state")
    }
    return result;
    
  }

  handle_step(stepName: string){
    const matchingState = this.getStepByName(stepName)
    const result: HandlerResult = new HandlerResult();
    
    if (matchingState instanceof Specification.Operationstate){
        const action = this.getFirstAction(matchingState)!
        //TODO publish action
        this.publish_action(stepName, action.name!);
    
        result.stepName = stepName
        result.actionName = action.name!
        result.type = ResultType.ACTION
    }
    else if (matchingState instanceof Specification.Databasedswitchstate){
      const triggeringStepName: string = this.getTriggeringStepName(matchingState)
     
      //TODO publish step
      this.publish_step(triggeringStepName);
      result.stepName = triggeringStepName
      result.type = ResultType.STEP
    }
    else if (matchingState instanceof Specification.Parallelstate){
      const actions = this.getParallelActions(matchingState)
      actions.forEach(element => {
        const action: Specification.Action = element as Specification.Action
        //TODO publish action
        this.publish_action(stepName, action.name!);
        result.stepName = stepName
        result.actionName = action.name!
        result.type = ResultType.ACTION
      });
      
    }
    return result;
  }

  getParallelActions(step){
    const pStep: Specification.Parallelstate = step as Specification.Parallelstate;
    
    const branches = pStep.branches
    branches.forEach(element => {
      const branch: Specification.Branch = element as Specification.Branch
      return branch.actions
    });
    return []
  }

  getTriggeringStepName(step){
    const dbStep: Specification.Databasedswitchstate = step as Specification.Databasedswitchstate;
    const conditions = dbStep.dataConditions
    var triggeringStepName: string | null = null;
    conditions.forEach(element => {
      if(element instanceof Specification.Transitiondatacondition){
        const condition:  Specification.Transitiondatacondition = element as Specification.Transitiondatacondition
        // TODO evaluate condition.condition
        if( typeof condition.transition === "string"){
          triggeringStepName = condition.transition.toString()
        }
        else if( condition.transition instanceof Specification.Transition){
          const transition:Specification.Transition = condition.transition as Specification.Transition
          //TODO handle producing events
          triggeringStepName = transition.nextState
        }
      }
    });
    if(triggeringStepName == null){
      const condition: Specification.Defaultconditiondef = dbStep.defaultCondition as Specification.Defaultconditiondef
      const transition:Specification.Transition = condition.transition as Specification.Transition
      //TODO handle producing events
      triggeringStepName = transition.nextState
    }
    return triggeringStepName;
  }




  async test_flow(){
    const json: string = await this.getWf();
    const workflow1: Specification.Workflow = Specification.Workflow.fromSource(json);
    const startStep = this.getStartNode(workflow1)
    this.publish_step(startStep.name!.toString())
   

    const count=10;
    for(let idx=1;idx<=count;idx++){
        const stepName = this.consume_step()!;
        if(stepName != null){
          this.handle_step( stepName);
        }
        const actionMessage = this.consume_action();
        if(actionMessage != null){
         this.handle_action(actionMessage?.step_name!, actionMessage?.action_name!);
        }

    }
  }

}


function greeter(person: string) {
  const json = this.getWf()
  const util: WorkflowSdkUtil = new WorkflowSdkUtil(json)
  util.test_flow();
}



//states
  //operationstateBuilder
  //sleepstateBuilder
  //databasedswitchstateBuilder
  //parallelstateBuilder


