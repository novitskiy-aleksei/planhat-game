import { Component, OnInit } from '@angular/core';
import { Emitter } from '../../../engine/services/emitter.service';
import {
  BugReportedEvent,
  CancellationEvent,
  FeatureRequestedEvent,
  NewCustomerEvent,
  PlanChangedEvent, SupportRequestEvent
} from '../../../engine/models/models';

@Component({
  selector: 'app-logger',
  styleUrls: ['logger.component.scss'],
  templateUrl: 'logger.component.html',
})
export class LoggerComponent implements OnInit {
  items: string[] = [];

  constructor(private emitter: Emitter) {}

  ngOnInit() {
    this.setupListeners();
  }

  setupListeners() {
    this.emitter.on<NewCustomerEvent>(NewCustomerEvent.name).subscribe(event => {
      this.addItem(`Congratulations, you have new customer: ${event.customer.name}!`);
    });
    this.emitter.on<CancellationEvent>(CancellationEvent.name).subscribe(event => {
      this.addItem(`Unfortunately, ${event.customer.name} want to unsubscribe`);
    });
    this.emitter.on<PlanChangedEvent>(PlanChangedEvent.name).subscribe(event => {
      if (event.previousPlan) {
        this.addItem(`${event.customer.name} has upgraded plan to ${event.customer.plan.type}`);
      } else {
        this.addItem(`${event.customer.name} downgraded plan to ${event.customer.plan.type}`);
      }
    });
    this.emitter.on<FeatureRequestedEvent>(FeatureRequestedEvent.name).subscribe(event => {
      this.addItem(`${event.customer.name} want to see new feature in your product`);
    });
    this.emitter.on<BugReportedEvent>(BugReportedEvent.name).subscribe(event => {
      this.addItem(`${event.customer.name} found distressing bug in your product`);
    });
    this.emitter.on<SupportRequestEvent>(SupportRequestEvent.name).subscribe(event => {
      this.addItem(`${event.customer.name} need support in using your product`);
    });

  }

  addItem(template) {
    this.items.push(template);
  }

}
