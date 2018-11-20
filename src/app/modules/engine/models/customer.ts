import { config } from '../configuration';
import { Plan } from './plan';
import { Populated } from '../../../utils/populated.abstract';

export class Customer extends Populated {
  id: string;
  name: string;
  phone: string;
  health: number;
  subscribedAt: Date;
  touchedAt: Date;
  plan: Plan;
  prevPlan: Plan;
  bugReportsCount = 0;
  featureRequestsCount = 0;
  questionsCount = 0;

  constructor(data: any) {
    super(data);
    this.subscribedAt = this.subscribedAt || new Date();
    this.plan = new Plan(Plan.BASIC);
  }

  upgradePlan() {
    if (this.plan.type === Plan.BASIC) {
      this.plan = new Plan(Plan.STANDARD);
    }
    if (this.plan.type === Plan.STANDARD) {
      this.plan = new Plan(Plan.PRO);
    }
  }

  downgradePlan() {
    if (this.plan.type === Plan.PRO) {
      this.plan = new Plan(Plan.STANDARD);
    }
    if (this.plan.type === Plan.STANDARD) {
      this.plan = new Plan(Plan.BASIC);
    }
  }

  reduceHealth(amount: number): this {
    if ((this.health - amount) >= 0) {
      this.health -= amount;
    }

    return this;
  }

  increaseHealth(amount: number): this {
    if ((this.health + amount) <= 5) {
      this.health += amount;
    } else {
      this.health = 5;
    }

    return this;
  }

  isAlive(): boolean {
    return this.health >= 0;
  }
}
