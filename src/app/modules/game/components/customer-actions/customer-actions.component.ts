import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../engine/models/customer';

@Component({
  selector: 'app-customer-actions',
  templateUrl: './customer-actions.component.html',
  styleUrls: ['./customer-actions.component.css']
})
export class CustomerActionsComponent {

  @Input() customer: Customer;

  constructor() { }

}
