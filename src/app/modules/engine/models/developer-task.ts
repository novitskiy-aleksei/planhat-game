export class DeveloperTask {
  startedAt: Date;

  constructor(public durationInMs: number) {
    this.startedAt = new Date();
  }

  isFinished() {
    return Date.now() > this.startedAt.getTime() + this.durationInMs;
  }
}
