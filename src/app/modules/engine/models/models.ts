import { Customer } from './customer';
import { Plan } from './plan';
import { Developer } from './developer';
import { EngineEvent } from './engine-event.abstract';
import { GameStats } from './game-stats';
import { DeveloperTask } from './developer-task';

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
  constructor(public task: DeveloperTask) {
    super();
  }
}

export class SupportRequestEvent extends EngineEvent {
  constructor(public customer: Customer) {
    super();
  }
}

export class BugReportedEvent extends EngineEvent {
  constructor(public task: DeveloperTask) {
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

export class GameEnded extends EngineEvent {
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
  constructor(public developer: Developer) {
    super();
  }
}

// ######################################################
// ### In game events
// ######################################################

export class AssignTaskEvent extends EngineEvent {
  constructor(public task: DeveloperTask) {
    super();
  }
}

export class DeveloperFinishedWorkEvent extends EngineEvent {
  constructor(public developer: Developer) {
    super();
  }
}
