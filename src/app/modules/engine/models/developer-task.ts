import { Customer } from './customer';
export class DeveloperTask {
  startedAt: Date;

  constructor(public type: 'bug' | 'feature', public customer: Customer, public durationInMs = 0) {
    this.startedAt = new Date();
  }

  isFinished() {
    return Date.now() > this.startedAt.getTime() + this.durationInMs;
  }
}
