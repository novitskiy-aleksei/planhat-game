import { config } from '../configuration';

export class Plan {
  private _price;

  constructor(public type: 'basic' | 'standart' | 'pro' = 'basic') {
    this._price = config.plans[type];
  }

  get price() {
    return this._price;
  }
}
