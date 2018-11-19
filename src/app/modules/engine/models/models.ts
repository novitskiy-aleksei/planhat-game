const config = {
  defaultHealth: 4,
  customerMinHealth: 0,
  customerMaxHealth: 5,

  customersStartCount: 5,
  timeScale: 12960, //real seconds in one game second
  gameDuration:  600, //seconds

  customerGrowCalculationInterval: 30,
  // customerCancellationCalculationInterval: 15,
  // ...

  customerGrowMinHealth: 3.6,

  plans: {
    basic: 3000,
    standart: 10000,
    pro: 25000,
  }
};

export class Plan {
  private _price;

  constructor(public type: 'basic' | 'standart' | 'pro' = 'basic') {
    this._price = config.plans[type];
  }

  get price() {
    return this._price;
  }
}

export class Customer {
  id: string;
  name: string;
  phone: string;
  health: number;
  subscribedAt: Date;
  touchedAt: Date;
  plan: Plan;
  needsAttention = false;

  constructor() {
    this.health = config.defaultHealth;
    this.subscribedAt = new Date();
    this.plan = new Plan();
  }
}

export class DeveloperTask {
  startedAt: Date;

  constructor(public duration: number) {
    this.startedAt = new Date();
  }
}

export class Developer {
  id: number;
  task: DeveloperTask;
}

export class DeveloperPool {
  developers: Developer[];
}

export class GameStats {
  customersCount: number;
  averageCustomerHealth: number;
  portfolioValue: number;
}

export class Task {
  constructor(public type: 'feature' | 'bug') {}
}

export class Event {
}

//######################################################
//### From engine to game
//######################################################
export class NewCustomerEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class PlanChangedEvent extends Event {
  constructor(public customer: Customer, public previousPlan: Plan) {
    super();
  }
}

export class CancellationEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class CustomerLostEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class FeatureRequestedEvent extends Event {
  constructor(public customer: Customer, public task: Task) {
    super();
  }
}

export class BugReportedEvent extends Event {
  constructor(public customer: Customer, public task: Task) {
    super();
  }
}

export class CustomerChangedEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class TimeShiftedEvent extends Event {
  constructor(public current: number, public gameDuration: number) {
    super();
  }
}

export class MonthStats {
  customerCharn: number;
  valueGrossCharn: number;
}

export class MonthEndedEvent extends Event {
  constructor(public monthStats: MonthStats) {
    super();
  }
}

//######################################################
//### From game to engine
//######################################################

export class HeldMeetingEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class AnsweredTicketEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class WonBackCancellationEvent extends Event {
  constructor(public customer: Customer) {
    super();
  }
}

export class TaskFinishedEvent extends Event {
  constructor(public customer: Customer, public task: Task) {
    super();
  }
}

//######################################################
//### In game events
//######################################################

export class AssignTaskEvent extends Event {
  constructor(public customer: Customer, public developer: Developer, task: Task) {
    super();
  }
}

export class DeveloperFinishedWorkEvent extends Event {
  constructor(public customer: Customer, public developer: Developer, task: Task) {
    super();
  }
}
