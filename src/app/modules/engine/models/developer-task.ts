import { Customer } from './customer';
export class DeveloperTask {
  startedAt: Date;

  constructor(public type: 'bug' | 'feature', public customer: Customer, public durationInSecs = 0) {
    this.startedAt = new Date();
  }

  isFinished() {
    return this.startedAt.getTime() + this.durationInSecs * 1000 < Date.now();
  }
}
