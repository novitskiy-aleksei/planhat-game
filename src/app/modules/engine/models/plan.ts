import { config } from '../configuration';

export class Plan {
  static readonly BASIC = 'basic';
  static readonly STANDARD = 'standard';
  static readonly PRO = 'pro';

  private readonly _price;

  constructor(public type: 'basic' | 'standard' | 'pro' = 'basic') {
    this._price = config.plans[type];
  }

  get price() {
    return this._price;
  }
}
