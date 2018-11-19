export class DeveloperTask {
  startedAt: Date;

  constructor(public duration: number) {
    this.startedAt = new Date();
  }
}
