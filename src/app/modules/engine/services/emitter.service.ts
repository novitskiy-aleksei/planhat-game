import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { EngineEvent } from '../models/engine-event.abstract';

@Injectable()
export class Emitter {

  private subjects = new Map<string, ReplaySubject<EngineEvent>>();

  emit(name: string, payload: EngineEvent) {
    let subject = this.subjects.get(name);
    if (!subject) {
      subject = new ReplaySubject<Event>(1);
      this.subjects.set(name, subject);
    }

    subject.next(payload);
  }

  on<T>(name: string): ReplaySubject<T> {
    let subject = this.subjects.get(name);
    if (!subject) {
      subject = new ReplaySubject<Event>(1);
      this.subjects.set(name, subject);
    }

    return subject as ReplaySubject<T>;
  }
}
