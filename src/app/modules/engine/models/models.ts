import { Customer } from './customer';
import { Plan } from './plan';
import { Task } from './task';
import { Developer } from './developer';
import { EngineEvent } from './engine-event.abstract';
import { GameStats } from './game-stats';

// ######################################################
// ### From engine to game
// ######################################################
export class NewCustomerEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class PlanChangedEvent extends EngineEvent {
  constructor(public customer: Customer, public previousPlan?: Plan) {
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

export class SupportRequestEvent extends EngineEvent {
  constructor(public customer: Customer) {
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

export class GameTimeEvent extends EngineEvent {
  constructor(public start: Date, public end: Date) {
    super();
  }
}

export class TimeShiftedEvent extends EngineEvent {
  constructor(public current: Date, public gameStarted: Date) {
    super();
  }
}

export class MonthStats {
  constructor(public customerCharn: number, public valueGrossCharn: number) {}
}

export class MonthEndedEvent extends EngineEvent {
  constructor(public monthStats: MonthStats) {
    super();
  }
}

export class GameStatsEvent extends EngineEvent {
  constructor(public stats: GameStats) {
    super();
  }

}
// ######################################################
// ### From game to engine
// ######################################################

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

// ######################################################
// ### In game events
// ######################################################

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
