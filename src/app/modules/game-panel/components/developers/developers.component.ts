import { Component } from '@angular/core';
import { Developer } from '../../../engine/models/developer';

@Component({
  selector: 'app-developers',
  styleUrls: ['developers.component.scss'],
  templateUrl: 'developers.component.html',
})
export class DevelopersComponent {
  developers: Developer[] = [];

  constructor() {
    this.developers = [
      new Developer(),
      new Developer(),
    ];
  }
}
