import { Populated } from '../../../utils/populated.abstract';

export class GameStats extends Populated {
  customersCount: number;
  averageCustomerHealth: number;
  portfolioValue: number;

  constructor(data) {
    super(data);
  }
}
