import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EngineEvent } from '../models/engine-event.abstract';

@Injectable()
export class Emitter {

  private subjects = new Map<string, Subject<EngineEvent>>();

  emit(name: string, payload: EngineEvent) {
    let subject = this.subjects.get(name);
    if (!subject) {
      subject = new Subject<Event>();
      this.subjects.set(name, subject);
    }

    subject.next(payload);
  }

  on<T>(name: string): Subject<T> {
    let subject = this.subjects.get(name);
    if (!subject) {
      subject = new Subject<Event>();
      this.subjects.set(name, subject);
    }

    return subject as Subject<T>;
  }
}
