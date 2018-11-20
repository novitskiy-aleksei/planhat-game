import { Component, OnInit } from '@angular/core';
import { Emitter } from '../../../engine/services/emitter.service';
import { Customer } from '../../../engine/models/customer';
import { NewCustomerEvent } from '../../../engine/models/models';

class LoggerItem {
  constructor(public template: string, public customer: Customer) {}
}

@Component({
  selector: 'app-logger',
  styleUrls: ['logger.component.scss'],
  templateUrl: 'logger.component.html',
})
export class LoggerComponent implements OnInit {
  items: LoggerItem[] = [];

  constructor(private emitter: Emitter) {}

  ngOnInit() {
    this.setupListeners();
  }

  setupListeners() {
    this.emitter.on<NewCustomerEvent>(NewCustomerEvent.name).subscribe(event => {
      this.addItem('Congratulations, you have new customer: {{customer}}!', event.customer);
    });
  }

  addItem(template, customer = null) {
    this.items.push(new LoggerItem(template, customer));
  }

  formatItem(item: LoggerItem) {
    let message = item.template;
    if (item.customer) {
      message = item.template.replace('{{customer}}', item.customer.name);
    }
    return message;
  }
}
