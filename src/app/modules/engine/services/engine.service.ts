import { Emitter } from './emitter.service';
import { Customer } from '../models/customer';
import { config } from '../configuration';
import { Injectable } from '@angular/core';
import {
  AnsweredTicketEvent, BugReportedEvent, CancellationEvent, CustomerChangedEvent, FeatureRequestedEvent, GameStatsEvent,
  HeldMeetingEvent, MonthEndedEvent, MonthStats,
  NewCustomerEvent, PlanChangedEvent, SupportRequestEvent,
  TaskFinishedEvent, TimeShiftedEvent,
  WonBackCancellationEvent
} from '../models/models';
import * as faker from 'faker';
import { Task } from '../models/task';
import { withChance } from '../../../utils/chance';
import { Plan } from '../models/plan';
import { GameStats } from '../models/game-stats';
import { CustomersService } from './customers.service';

@Injectable()
export class EngineService {
  private startedAt: Date;
  private monthsPassed = 1;

  constructor(private emitter: Emitter,
              private customers: CustomersService) {}

  initGameData() {
    this.startedAt = new Date();
    this.customers.generate(config.customersStartCount);
    this.setupListeners();
  }

  setupListeners() {
    this.emitter.on<HeldMeetingEvent>(HeldMeetingEvent.name).subscribe(e => this.onMeetingHeld(e.customer));
    this.emitter.on<AnsweredTicketEvent>(AnsweredTicketEvent.name).subscribe(e => this.onTickedAnswered(e.customer));
    this.emitter.on<WonBackCancellationEvent>(WonBackCancellationEvent.name).subscribe(e => this.onCancellationWin(e.customer));
    this.emitter.on<TaskFinishedEvent>(TaskFinishedEvent.name).subscribe(e => this.onTaskFinished(e.customer, e.task));
    this.emitter.on<TimeShiftedEvent>(TimeShiftedEvent.name).subscribe(e => {
      const monthDiff = (e.current.getTime() - e.gameStarted.getTime()) / 1000 / 60 / 60 / 24 / 30;
      if (this.monthsPassed < monthDiff) {
        this.monthsPassed++;
        this.customers.closeMonth();
        this.emitter.emit(MonthEndedEvent.name, new MonthEndedEvent(new MonthStats(
          this.customers.customersLost(),
          this.customers.valueLost()
        )));
      }
    });

    setInterval(() => this.tick(), config.tickInterval);
    setInterval(() => this.generateCustomerGrow(), config.customerGrowCalculationInterval * 100);
    setInterval(() => this.generateCancellation(), config.customerCancellationCalculationInterval * 100);
    setInterval(() => this.generateUpgradePlan(), config.customerUpgradePlanCalculationInterval * 100);
    setInterval(() => this.generateFeatureRequestFeature(), config.customerRequestFeatureCalculationInterval * 100);
    setInterval(() => this.generateBugReportFeature(), config.customerBugReportCalculationInterval * 100);
    setInterval(() => this.generateSupportTicketRequest(), config.customerSupportTicketCalculationInterval * 100);
  }

  tick() {
    // time translation
    const tick = Math.round((Date.now() - this.startedAt.getTime()) / 1000 * config.timeScale) * 1000;
    this.emitter.emit(
      TimeShiftedEvent.name,
      new TimeShiftedEvent(new Date(Date.now() + tick), this.startedAt, config.gameDuration * config.timeScale)
    );

    // generate game stats
    this.emitter.emit(GameStatsEvent.name, new GameStatsEvent(new GameStats({
      customersCount: this.customers.count(),
      averageCustomerHealth: this.customers.avgHealth(),
      portfolioValue: this.customers.totalValue()
    })));

    // calculate customers health
    this.customers.all().forEach(customer => {
      if (!customer.reduceHealth(config.reduceHpPerTick).isAlive()) {
        customer.prevPlan = Object.assign({}, customer.plan);
        customer.plan = null;
        this.emitter.emit(CancellationEvent.name, new CancellationEvent(customer));
      }
      this.emitter.emit(CustomerChangedEvent.name, new CustomerChangedEvent(customer));
    });
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

  generateSupportTicketRequest() {
    this.customers.all().forEach(customer => {
      if (withChance(1.8)) {
        this.emitter.emit(SupportRequestEvent.name, new SupportRequestEvent(customer));
      }
    });
  }

  generateBugReportFeature() {
    this.customers.all().forEach(customer => {
      if (withChance(0.8)) {
        this.emitter.emit(BugReportedEvent.name, new BugReportedEvent(customer, new Task('feature')));
      }
    });
  }

  generateFeatureRequestFeature() {
    this.customers.all().forEach(customer => {
      if (withChance(0.8)) {
        this.emitter.emit(FeatureRequestedEvent.name, new FeatureRequestedEvent(customer, new Task('feature')));
      }
    });
  }

  generateUpgradePlan() {
    this.customers.all().forEach(customer => {
      if (withChance((customer.health / 70) * 100) && customer.plan && customer.plan.type !== Plan.PRO) {
        const prev = customer.plan;
        customer.upgradePlan();
        this.emitter.emit(PlanChangedEvent.name, new PlanChangedEvent(customer, prev));
      }
    });
  }

  generateCancellation() {
    this.customers.all().forEach(customer => {
      if (withChance((customer.health - config.customerMaxHealth) * -0.1)) {
        customer.plan = null;
        this.emitter.emit(CancellationEvent.name, new CancellationEvent(customer));
      }
    });
  }

  generateCustomerGrow() {
    this.customers.all().forEach(customer => {
      if (customer.health < config.customerGrowMinHealth) {
        return;
      }

      if (withChance((customer.health / 140) * 100) && this.customers.count() < config.customersMaxCount) {
        const invitedCustomer = new Customer({
          id: faker.random.uuid(),
          name: faker.name.firstName(),
          phone: faker.phone.phoneNumber(),
        });

        this.customers.add(invitedCustomer);
        this.emitter.emit(NewCustomerEvent.name, new NewCustomerEvent(invitedCustomer));
      }
    });
  }
}
