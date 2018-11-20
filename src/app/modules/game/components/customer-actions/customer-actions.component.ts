import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../engine/models/customer';
import { Emitter } from '../../../engine/services/emitter.service';
import { AssignTaskEvent, AnsweredTicketEvent, HeldMeetingEvent } from '../../../engine/models/models';
import { DeveloperTask } from '../../../engine/models/developer-task';
import { EngineService } from '../../../engine/services/engine.service';

@Component({
  selector: 'app-customer-actions',
  templateUrl: './customer-actions.component.html',
  styleUrls: ['./customer-actions.component.css']
})
export class CustomerActionsComponent {

  @Input() customer: Customer;
  @Output() call = new EventEmitter<Customer>();

  constructor(private emitter: Emitter, private engine: EngineService) { }

  runInPersonMeeting() {
    this.emitter.emit(HeldMeetingEvent.name, new HeldMeetingEvent(this.customer));
  }

  callOut() {
    this.call.emit(this.customer);
  }

  fixBug() {
    const task = new DeveloperTask('bug', this.customer);
    this.emitter.emit(AssignTaskEvent.name, new AssignTaskEvent(task));
  }

  buildFeature() {
    const task = new DeveloperTask('feature', this.customer);
    this.emitter.emit(AssignTaskEvent.name, new AssignTaskEvent(task));
  }

  answerQuestion() {
    this.emitter.emit(AnsweredTicketEvent.name, new AnsweredTicketEvent(this.customer));
  }

  haveFreeDevelopers() {
    return this.engine.developerPool.hasAvailableDevelopers();
  }

}
