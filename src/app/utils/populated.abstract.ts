export abstract class Populated {

  constructor(data = {}) {
    Object.getOwnPropertyNames(data).forEach(key => this[key] = data[key]);
  }

}
