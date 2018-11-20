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
      const customer = this.createOne();
      this.list.push(customer);
      this.emitter.emit(NewCustomerEvent.name, new NewCustomerEvent(customer));
    }

    return this.list;
  }

  createOne(): Customer {
    return new Customer({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      phone: faker.phone.phoneNumber(),
    });
  }

  add(customer: Customer) {
    this.list.push(customer);
  }

  remove(customerId: string) {
    this.list.splice(this.list.findIndex(c => c.id === customerId));
  }

  count(): number {
    return this.list.length;
  }

  avgHealth(): number {
    const acc = 0;
    this.list.reduce((undefined, c) => acc + c.health, acc);

    return acc / this.count();
  }

  totalValue(): number {
    const acc = 0;
    this.list.reduce((undefined, c) => c.plan ? acc + c.plan.price : acc, acc);

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
    const acc = 0;
    this.lost.reduce((undefined, c) => acc + c.prevPlan.price, acc);
    return acc;
  }
}
