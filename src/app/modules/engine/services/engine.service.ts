import { Emitter } from './emitter.service';
import { Customer } from '../models/customer';
import { config } from '../configuration';
import { Injectable } from '@angular/core';
import {
  AnsweredTicketEvent, GameTimeEvent, BugReportedEvent, CancellationEvent, CustomerChangedEvent, FeatureRequestedEvent, GameStatsEvent,
  HeldMeetingEvent, MonthEndedEvent, MonthStats,
  NewCustomerEvent, PlanChangedEvent, SupportRequestEvent,
  TaskFinishedEvent, TimeShiftedEvent,
  WonBackCancellationEvent
} from '../models/models';
import { Task } from '../models/task';
import { withChance } from '../../../utils/chance';
import { Plan } from '../models/plan';
import { GameStats } from '../models/game-stats';
import { CustomersService } from './customers.service';
import { DeveloperPool } from '../models/developer-pool';
import { Developer } from '../models/developer';

@Injectable()
export class EngineService {
  private startedAt: Date;
  private monthsPassed = 1;
  developerPool = new DeveloperPool(2);

  constructor(private emitter: Emitter, private customers: CustomersService) {}

  initGameData() {
    console.log('DEVELOPERS:', this.developerPool.developers);
    this.startedAt = new Date();
    this.customers.generate(config.customersStartCount);
    this.setupListeners();

    this.emitter.emit(
      GameTimeEvent.name,
      new GameTimeEvent(this.startedAt, new Date(this.startedAt.getTime() + (config.gameDuration * config.timeScale) * 1000))
    );
  }

  setupListeners() {
    this.emitter.on<HeldMeetingEvent>(HeldMeetingEvent.name).subscribe(e => this.onMeetingHeld(e.customer));
    this.emitter.on<AnsweredTicketEvent>(AnsweredTicketEvent.name).subscribe(e => this.onTickedAnswered(e.customer));
    this.emitter.on<WonBackCancellationEvent>(WonBackCancellationEvent.name).subscribe(e => this.onCancellationWin(e.customer));
    this.emitter.on<TaskFinishedEvent>(TaskFinishedEvent.name).subscribe(e => this.onTaskFinished(e.customer, e.task));
    this.emitter.on<TimeShiftedEvent>(TimeShiftedEvent.name).subscribe(e => this.onMonthEndCheck(e.current, e.gameStarted));

    setInterval(() => this.tick(), config.tickInterval);
    setInterval(() => this.generateCustomerGrow(), config.customerGrowCalculationInterval * 100);
    setInterval(() => this.generateCancellation(), config.customerCancellationCalculationInterval * 100);
    setInterval(() => this.generateChangePlan(), config.customerUpgradePlanCalculationInterval * 100);
    setInterval(() => this.generateFeatureRequestFeature(), config.customerRequestFeatureCalculationInterval * 100);
    setInterval(() => this.generateBugReportFeature(), config.customerBugReportCalculationInterval * 100);
    setInterval(() => this.generateSupportTicketRequest(), config.customerSupportTicketCalculationInterval * 100);
  }

  private tick() {
    // time translation
    const tick = Math.round((Date.now() - this.startedAt.getTime()) / 1000 * config.timeScale) * 1000;
    this.emitter.emit(
      TimeShiftedEvent.name,
      new TimeShiftedEvent(new Date(Date.now() + tick), this.startedAt)
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

  private onMeetingHeld(customer: Customer) {
    this.emitter.emit(
      CustomerChangedEvent.name,
      new CustomerChangedEvent(customer.increaseHealth(config.affections.positive.meeting))
    );
  }

  private onTickedAnswered(customer: Customer) {
    this.emitter.emit(
      CustomerChangedEvent.name,
      new CustomerChangedEvent(customer.increaseHealth(config.affections.positive.ticket))
    );
  }

  private onCancellationWin(customer: Customer) {
    this.emitter.emit(
      CustomerChangedEvent.name,
      new CustomerChangedEvent(customer.increaseHealth(config.affections.positive.cancellationWin))
    );
  }

  private onTaskFinished(customer: Customer, task: Task) {
    this.emitter.emit(
      CustomerChangedEvent.name,
      new CustomerChangedEvent(customer.increaseHealth(config.affections.positive.feature))
    );
  }

  private onMonthEndCheck(current: Date, gameStarted: Date) {
    const monthDiff = (current.getTime() - gameStarted.getTime()) / 1000 / 60 / 60 / 24 / 30;
    if (this.monthsPassed < monthDiff) {
      this.monthsPassed++;
      this.customers.closeMonth();
      this.emitter.emit(MonthEndedEvent.name, new MonthEndedEvent(new MonthStats(
        this.customers.customersLost(),
        this.customers.valueLost()
      )));
    }
  }

  private generateSupportTicketRequest() {
    this.customers.all().forEach(customer => {
      if (withChance(1.8)) {
        this.emitter.emit(CustomerChangedEvent.name, new CustomerChangedEvent(customer.reduceHealth(config.affections.negative.ticket)));
        this.emitter.emit(SupportRequestEvent.name, new SupportRequestEvent(customer));
      }
    });
  }

  private generateBugReportFeature() {
    this.customers.all().forEach(customer => {
      if (withChance(0.8)) {
        this.emitter.emit(CustomerChangedEvent.name, new CustomerChangedEvent(customer.reduceHealth(config.affections.negative.bug)));
        this.emitter.emit(BugReportedEvent.name, new BugReportedEvent(customer, new Task('bug')));
      }
    });
  }

  private generateFeatureRequestFeature() {
    this.customers.all().forEach(customer => {
      if (withChance(0.8)) {
        this.emitter.emit(CustomerChangedEvent.name, new CustomerChangedEvent(customer.reduceHealth(config.affections.negative.feature)));
        this.emitter.emit(FeatureRequestedEvent.name, new FeatureRequestedEvent(customer, new Task('feature')));
      }
    });
  }

  private generateChangePlan() {
    this.customers.all().forEach(customer => {
      if (!customer.plan) {
        return;
      }

      // downgrade
      if (customer.plan.type !== Plan.BASIC && withChance(15)) {
        customer.downgradePlan();
        this.emitter.emit(PlanChangedEvent.name, new PlanChangedEvent(customer));
        return;
      }

      // upgrade
      if (customer.plan.type !== Plan.PRO && withChance((customer.health / 165) * 100)) {
        const prev = customer.plan;
        customer.upgradePlan();
        this.emitter.emit(PlanChangedEvent.name, new PlanChangedEvent(customer, prev));
      }
    });
  }

  private generateCancellation() {
    this.customers.all().forEach(customer => {
      if (withChance((customer.health - config.customerMaxHealth) * -0.3)) {
        customer.plan = null;
        this.emitter.emit(CancellationEvent.name, new CancellationEvent(customer));
      }
    });
  }

  private generateCustomerGrow() {
    this.customers.all().forEach(customer => {
      if (customer.health < config.customerGrowMinHealth) {
        return;
      }

      if (withChance((customer.health / 240) * 100) && this.customers.count() < config.customersMaxCount) {
        const invitedCustomer = this.customers.createOne();
        this.customers.add(invitedCustomer);
        this.emitter.emit(NewCustomerEvent.name, new NewCustomerEvent(invitedCustomer));
      }
    });
  }
}
