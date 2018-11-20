import { Component, Input } from '@angular/core';
import { Customer } from '../../../engine/models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  healthClass: string;

  @Input()
  set customer(customer: Customer) {
    this.healthClass = this.getHealthClass(customer.health);
  }

  constructor() {
  }

  getHealthClass(health: number) {
    if (health > 4) {
      return 'excellent';
    } else if (health > 3) {
      return 'good';
    } else if (health > 2) {
      return 'fair';
    } else {
      return 'poor';
    }
  }

}
