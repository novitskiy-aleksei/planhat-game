import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Emitter } from '../../../engine/services/emitter.service';
import { CustomerChangedEvent, GameTimeEvent, NewCustomerEvent } from '../../../engine/models/models';
import { Customer } from '../../../engine/models/customer';
import { config } from '../../../engine/configuration';
import { Transform } from '../../models/transform';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  map = new Map();
  gameStartAt: Date;
  private subscribers: Subscription[] = [];

  constructor(private emitter: Emitter, private elementRef: ElementRef, private modalService: ModalService) {
  }

  get currentTime() {
    const tick = Math.round((Date.now() - this.gameStartAt.getTime()) / 1000 * config.timeScale) * 1000;

    return new Date(Date.now() + tick);
  }

  ngOnInit() {
    this.subscribers.push(
      this.emitter.on(GameTimeEvent.name).subscribe((e: GameTimeEvent) => {
        this.gameStartAt = e.start;
      })
    );
    this.subscribers.push(
      this.emitter.on(NewCustomerEvent.name).subscribe((e: NewCustomerEvent) => {
        this.map.set(e.customer, this.calculateTransform(e.customer));
        setTimeout(() => {
          const v = this.map.get(e.customer);
          v.x = 0;
        }, 0);
      })
    );
    this.subscribers.push(
      this.emitter.on(CustomerChangedEvent.name).subscribe((e: CustomerChangedEvent) => {
        if (this.map.get(e.customer)) {
          return null;
        }
        this.map.set(e.customer, this.calculateTransform(e.customer));
        setTimeout(() => {
          const v = this.map.get(e.customer);
          v.x = 0;
        }, 100);
      })
    );
  }

  getCustomers(map): Customer[] {
    return Array.from(map.keys());
  }

  calculateTransform(customer: Customer): Transform {
    const x = this.elementRef.nativeElement.offsetWidth * this.calculateDiffDaysPercent(this.currentTime, customer.subscriptionEndAt) / 100;
    const y = (this.elementRef.nativeElement.offsetHeight * this.calculateDiffDaysPercent(this.currentTime, customer.touchedAt) / 100) - 55;
    const transition = (customer.subscriptionEndAt.getTime() - this.currentTime.getTime()) / config.timeScale / 1000;

    return new Transform(x, y, transition, );
  }

  calculateDiffDaysPercent(date1: Date, date2: Date) {
    const daysInMonth = 31;
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return 100 * diffDays / daysInMonth;
  }

  openCustomerActionsModal(id: number, customer: Customer) {
    this.modalService.open('customer-actions-' + id);
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((s) => s.unsubscribe());
    this.subscribers = [];
  }

}
