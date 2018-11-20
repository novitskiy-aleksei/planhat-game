import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Emitter } from '../../../engine/services/emitter.service';
import { CustomerChangedEvent, NewCustomerEvent, TimeShiftedEvent } from '../../../engine/models/models';
import { Customer } from '../../../engine/models/customer';

class Position {
  constructor(public x: number, public y: number) {
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  map = new Map();
  currentTime: Date;
  private subscribers: Subscription[] = [];

  constructor(private emitter: Emitter) {
  }

  ngOnInit() {
    this.subscribers.push(
      this.emitter.on(NewCustomerEvent.name).subscribe((e: NewCustomerEvent) => {
        this.map.set(e.customer, this.calculatePosition(e.customer));
      })
    );
    this.subscribers.push(
      this.emitter.on(CustomerChangedEvent.name).subscribe((e: CustomerChangedEvent) => {
        this.map.set(e.customer, this.calculatePosition(e.customer));
      })
    );
    this.subscribers.push(
      this.emitter.on(TimeShiftedEvent.name).subscribe((e: TimeShiftedEvent) => {
        this.currentTime = e.current;
        this.map.forEach((oldPosition, customer) => {
          this.map.set(customer, this.calculatePosition(customer));
        });
      })
    );
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  calculatePosition(customer: Customer): Position {
    if (!this.currentTime) {
      return new Position(0, 0);
    }
    const subscriptionEnd = new Date(customer.subscribedAt.getTime());
    subscriptionEnd.setMonth(customer.subscribedAt.getMonth() + 1);


    const x = this.doMagic(this.currentTime, subscriptionEnd);
    const y = this.doMagic(this.currentTime, customer.touchedAt);

    return new Position(x, y);
  }

  doMagic(date1: Date, date2: Date) {
    const daysInMonth = 31;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return  100 * diffDays / daysInMonth;
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((s) => s.unsubscribe());
    this.subscribers = [];
  }

}
