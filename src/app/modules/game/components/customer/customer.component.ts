import { Component, Input } from '@angular/core';
import { Customer } from '../../../engine/models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  @Input() health: number;

  constructor() {
  }

  get healthClass() {
    if (this.health > 4) {
      return 'excellent';
    } else if (this.health > 3) {
      return 'good';
    } else if (this.health > 2) {
      return 'fair';
    } else {
      return 'poor';
    }
  }

}
