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
  needsAttention = false;

  constructor(data: any) {
    super(data);
    this.health = config.defaultHealth;
    this.subscribedAt = new Date();
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

  reduceHealth(amount: number): this {
    this.health -= amount;
    return this;
  }

  increaseHealth(amount: number): this {
    this.health += amount;
    return this;
  }

  isAlive(): boolean {
    return this.health >= 0;
  }
}
