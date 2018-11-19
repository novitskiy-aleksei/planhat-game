import { Customer } from './customer';
import { Plan } from './plan';
import { Task } from './task';
import { Developer } from './developer';
import { EngineEvent } from './engine-event.abstract';

// ######################################################
// ### From engine to game
// ######################################################
export class NewCustomerEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class PlanChangedEvent extends EngineEvent {
  constructor(public customer: Customer, public previousPlan: Plan) {
    super();
  }
}

export class CancellationEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class CustomerLostEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class FeatureRequestedEvent extends EngineEvent {
  constructor(public customer: Customer, public task: Task) {
    super();
  }
}

export class BugReportedEvent extends EngineEvent {
  constructor(public customer: Customer, public task: Task) {
    super();
  }
}

export class CustomerChangedEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class TimeShiftedEvent extends EngineEvent {
  constructor(public current: number, public gameDuration: number) {
    super();
  }
}

export class MonthStats {
  customerCharn: number;
  valueGrossCharn: number;
}

export class MonthEndedEvent extends EngineEvent {
  constructor(public monthStats: MonthStats) {
    super();
  }
}

//######################################################
//### From game to engine
//######################################################

export class HeldMeetingEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class AnsweredTicketEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class WonBackCancellationEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class TaskFinishedEvent extends EngineEvent {
  constructor(public customer: Customer, public task: Task) {
    super();
  }
}

//######################################################
//### In game events
//######################################################

export class AssignTaskEvent extends EngineEvent {
  constructor(public customer: Customer, public developer: Developer, task: Task) {
    super();
  }
}

export class DeveloperFinishedWorkEvent extends EngineEvent {
  constructor(public customer: Customer, public developer: Developer, task: Task) {
    super();
  }
}
