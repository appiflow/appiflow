import { Injectable } from '@nestjs/common';
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
@Injectable()
export class AppService {
  getHello(): string {

    const workflow_new = workflowBuilder()
      .id('applicantrequest')
      .version('1.0')
      .specVersion('0.8')
      .name('Applicant Request Decision Workflow')
      .description('Determine if applicant request is valid')
      .start('CheckApplication')
      .functions([
        functionBuilder()
          .name('sendRejectionEmailFunction')
          .operation('http://myapis.org/applicationapi.json#emailRejection')
          .build(),
      ])
      .states([
        databasedswitchstateBuilder()
          .name('CheckApplication')
          .dataConditions([
            transitiondataconditionBuilder()
              .condition('${ .applicants | .age >= 18 }')
              .transition('StartApplication')
              .build(),
            transitiondataconditionBuilder()
              .condition('${ .applicants | .age < 18 }')
              .transition('RejectApplication')
              .build(),
          ])
          .defaultCondition(defaultconditiondefBuilder().transition('RejectApplication').build())
          .build(),
        operationstateBuilder()
          .name('StartApplication')
          .actions([actionBuilder().subFlowRef('startApplicationWorkflowId').build()])
          .build(),
        operationstateBuilder()
          .name('RejectApplication')
          .actionMode('sequential')
          .actions([
            actionBuilder()
              .functionRef(
                functionrefBuilder()
                  .refName('sendRejectionEmailFunction')
                  .arguments({ applicant: '${ .applicant }' })
                  .build()
              )
              .build(),
          ])
          .build(),
      ])
      .build();
    
      const expected = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/appiflow/req.json', 'utf8');
      const workflow: Specification.Workflow = Specification.Workflow.fromSource(expected);
      const json:string = Specification.Workflow.toJson(workflow_new)
      
     
      console.log(workflow.start)
      console.log(workflow.states.length)
      console.log(workflow.states[0].name)
      console.log(workflow.states[0].type)
      const startState: string = workflow.start.toString()
      const startingState = workflow.states.find((state) => state.name === startState)
      console.log("starting state "+ startingState.name)
      const dbs: Specification.Databasedswitchstate = workflow.states[0] as Specification.Databasedswitchstate;
      
      const dc: Specification.Transitiondatacondition = dbs.dataConditions[0] as Specification.Transitiondatacondition
      console.log(dc.transition)
      console.log(dc.condition)

      const ops: Specification.Operationstate = workflow.states[1] as Specification.Operationstate;
      console.log(ops.actions[0])

      const ops2: Specification.Operationstate = workflow.states[2] as Specification.Operationstate;
      console.log(ops2.actions[0])

      const act1: Specification.Action = ops2.actions[0] as Specification.Action
      console.log("act1")
      console.log(act1.functionRef)

      const fnref: Specification.Functionref = act1.functionRef as Specification.Functionref
      console.log("fnref")
      console.log(fnref.refName)
      console.log(fnref.arguments)

      const fn: Specification.Function = workflow.functions[0] as Specification.Function
      console.log(fn.name)
      console.log(fn.operation)
      //const os1: Specification.Operationstate = workflow.states[1];
      //console.log(os1.actions)

      

      const expected2 = fs.readFileSync('/Users/raghuveermb/Desktop/tech/workflow/code/appiflow/req2.json', 'utf8');
      const workflow2: Specification.Workflow = Specification.Workflow.fromSource(expected2);
      
      
     
      
      console.log(workflow2.states.length)
      console.log(workflow2.states[0].name)
      console.log(workflow2.states[0].type)

      const injectionState:Specification.Injectstate = workflow2.states[0] as Specification.Injectstate;
      console.log(injectionState.data)
      console.log(injectionState.data)


    return 'Hello World!' + workflow.id;
  }
}
