import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import * as faker from 'faker';
import { NewCustomerEvent } from '../models/models';
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
    this.list.reduce((undefined, c) => acc + c.plan.price, acc);

    return acc;
  }

}
