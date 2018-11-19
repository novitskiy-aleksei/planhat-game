export class Emitter {
  private subjects = new Map<string, Subject<Event>>();

  emit(event: string, payload: Event) {
    let subject = this.subjects.get(event);
    if (!subject) {
      subject = new Subject<Event>();
      this.subjects.set(event, subject);
    }

    subject.next(payload);
  }

  on(event: string): Subject<Event> {
    return this.subjects.get(event);
  }
}
