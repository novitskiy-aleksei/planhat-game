import { Emitter } from './emitter.service';

export class EngineService {
  private readonly TICK_INTERVAL = 1000;

  private customers: Customer[];
  private startedAt: Date;

  constructor(private emitter: Emitter) {}

  init() {
    this.startedAt = new Date();
    setInterval(() => this.tick(), this.TICK_INTERVAL);
    this.customers = this.generateCustomers(config.customersStartCount);
    this.setupListeners();
  }

  setupListeners() {
    this.emitter.on('heldMeeting', customer => this.onHeldMeeting(customer));
    this.emitter.on('answeredTicket', customer => this.onHeldMeeting(customer));
    this.emitter.on('wonBackCancellation', customer => this.onHeldMeeting(customer));
    this.emitter.on('taskFinished', (customer, task) => this.onHeldMeeting(customer, task));
  }

  tick() {
    this.generateCustomerGrow(); //setInterval from config
    //generate cancellations
    //generate upgrade plan
    //generate request feature
    //generate bug report
    //generate support ticket

    //generate game stats //every tick
    //calculate customers health //every tick

    //calculate customer lost //every month
    //generate month ended //eventy month

    this.emitter.emit('timeShifted', new TimeShiftedEvent(
      (Date.now() - this.startedAt.getTime()) / 1000 * config.timeScale, config.gameDuration * config.timeScale));
  }

  generateCustomers(count: number) {
    for (let i = 0; i < count; i++) {
      const customer = new Customer();
      this.customers.push(customer);
      this.emitter.emit('newCustomer', new NewCustomerEvent(customer));
    }
  }

  generateCustomerGrow() {
    this.customers.forEach(customer => {
      if (customer.health < config.customerGrowMinHealth) {
        return;
      }
      // Math.rand
      // const newCustomersCount =
      // this.emitter.emit('newCustomer', new NewCustomerEvent(customer));
    });
  }
}
