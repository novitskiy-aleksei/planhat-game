import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import * as faker from 'faker';
import { MonthStats, NewCustomerEvent } from '../models/models';
import { Emitter } from './emitter.service';

@Injectable()
export class CustomersService {

  private list: Customer[] = [];
  private lost: Customer[] = [];

  constructor(private emitter: Emitter) { }

  all(): Customer[] {
    return this.list;
  }

  generate(count: number): Customer[] {
    for (let i = 0; i < count; i++) {
      const customer = this.createAtStartOne();
      this.list.push(customer);
      this.emitter.emit(NewCustomerEvent.name, new NewCustomerEvent(customer));
    }

    return this.list;
  }

  createAtStartOne(): Customer {
    return new Customer({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      phone: faker.phone.phoneNumber(),
      health: faker.random.number({min: 3, max: 5}),
      touchedAt: faker.date.soon(-30),
      subscribedAt: faker.date.soon(-30)
    });
  }

  createOne(): Customer {
    return new Customer({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      phone: faker.phone.phoneNumber(),
      health: faker.random.number({min: 4, max: 4}),
      touchedAt: faker.date.soon(0),
      subscribedAt: faker.date.soon(0)
    });
  }

  add(customer: Customer) {
    this.list.push(customer);
  }

  remove(customerId: string) {
    this.list.splice(this.list.findIndex(c => c.id === customerId), 1);
  }

  count(): number {
    return this.list.length;
  }

  avgHealth(): number {
    let acc = 0;
    this.list.forEach((c) => acc += c.health);
    return acc / this.count();
  }

  totalValue(): number {
    let acc = 0;
    this.list.forEach(c => c.plan ? acc += c.plan.price : acc);
    return acc;
  }

  closeMonth() {
    this.list.forEach(customer => {
      if (!customer.plan) {
        this.lost.push(customer);
        this.remove(customer.id);
      }
    });
  }

  customersLost(): number {
    return this.lost.length;
  }

  valueLost(): number {
    let acc = 0;
    this.lost.forEach(c => acc += c.prevPlan.price);
    return acc;
  }
}
