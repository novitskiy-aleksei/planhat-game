import { Emitter } from './emitter.service';
import { Customer } from '../models/customer';
import { config } from '../configuration';
import { Injectable } from '@angular/core';
import {
  AnsweredTicketEvent,
  HeldMeetingEvent,
  NewCustomerEvent,
  TaskFinishedEvent, TimeShiftedEvent,
  WonBackCancellationEvent
} from '../models/models';
import * as faker from 'faker';
import { Task } from '../models/task';
import { withChance } from '../../../utils/chance';

@Injectable()
export class EngineService {
  private customers: Customer[] = [];
  private startedAt: Date;

  constructor(private emitter: Emitter) {}

  initGameData() {
    this.startedAt = new Date();
    this.customers = this.generateCustomers(config.customersStartCount);
    this.setupListeners();
  }

  setupListeners() {
    this.emitter.on<HeldMeetingEvent>(HeldMeetingEvent.name).subscribe(e => this.onMeetingHeld(e.customer));
    this.emitter.on<AnsweredTicketEvent>(AnsweredTicketEvent.name).subscribe(e => this.onTickedAnswered(e.customer));
    this.emitter.on<WonBackCancellationEvent>(WonBackCancellationEvent.name).subscribe(e => this.onCancellationWin(e.customer));
    this.emitter.on<TaskFinishedEvent>(TaskFinishedEvent.name).subscribe(e => this.onTaskFinished(e.customer, e.task));

    setInterval(() => {
      this.emitter.emit(
        TimeShiftedEvent.name,
        new TimeShiftedEvent(
          Math.round((Date.now() - this.startedAt.getTime()) / 1000 * config.timeScale),
          config.gameDuration * config.timeScale
        )
      );
    }, config.tickInterval);
    setInterval(() => this.generateCustomerGrow(), config.customerGrowCalculationInterval * 100);
    setInterval(() => this.generateCancellation(), config.customerGrowCalculationInterval * 100);
    // setInterval(() => this.generateCancellation(), config.customerGrowCalculationInterval * 100);
    // setInterval(() => this.generateCancellation(), config.customerGrowCalculationInterval * 100);
  }

  tick() {
    // generate cancellations
    // generate upgrade plan
    // generate request feature
    // generate bug report
    // generate support ticket

    // generate game stats //every tick
    // calculate customers health //every tick

    // calculate customer lost //every month
    // generate month ended //eventy month
  }

  onMeetingHeld(customer: Customer) {
    console.log('meeting');
  }

  onTickedAnswered(customer: Customer) {
    console.log('onTickedAnswered');
  }

  onCancellationWin(customer: Customer) {
    console.log('onCancellationWin');
  }

  onTaskFinished(customer: Customer, task: Task) {
    console.log('onTaskFinished');
  }

  generateCancellation() {

  }

  generateCustomers(count: number) {
    for (let i = 0; i < count; i++) {
      const customer = new Customer({
        id: faker.random.uuid(),
        name: faker.name.firstName(),
        phone: faker.phone.phoneNumber(),
      });
      this.customers.push(customer);
      this.emitter.emit(NewCustomerEvent.name, new NewCustomerEvent(customer));
    }

    return this.customers;
  }

  generateCustomerGrow() {
    this.customers.forEach(customer => {
      if (customer.health < config.customerGrowMinHealth) {
        return;
      }

      if (withChance((customer.health / 70) * 100)) {
        const invitedCustomer = new Customer({
          id: faker.random.uuid(),
          name: faker.name.firstName(),
          phone: faker.phone.phoneNumber(),
        });

        this.customers.push(invitedCustomer);
        this.emitter.emit(NewCustomerEvent.name, new NewCustomerEvent(invitedCustomer));
      }
    });
  }
}
