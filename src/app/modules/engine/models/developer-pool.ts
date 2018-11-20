import { Developer } from './developer';

export class DeveloperPool {
  developers: Developer[] = [];

  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      this.developers.push(new Developer());
    }
  }

  hasAvailableDevelopers() {
    return this.developers.filter(d => !d.task).length > 0;
  }

  getAvaliableDeveloper() {
    const freeDevelopers = this.developers.filter(d => !d.task);
    if (!freeDevelopers.length) {
      return;
    }
    return freeDevelopers[0];
  }
}
