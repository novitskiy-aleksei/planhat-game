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
  needsAttention = false;

  constructor(data: any) {
    super(data);
    this.health = config.defaultHealth;
    this.subscribedAt = new Date();
    this.plan = new Plan('basic');
  }
}
