import { Developer } from './developer';

export class DeveloperPool {
  developers: Developer[] = [];

  constructor(size) {
    for (let i = 0; i < size; i++) {
      this.developers.push(new Developer());
    }
  }

  hasAvailableDeveloper() {
    return this.developers.filter(developer => !developer.task).length > 0;
  }
}
