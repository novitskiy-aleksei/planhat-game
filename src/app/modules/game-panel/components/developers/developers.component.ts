import { Component } from '@angular/core';
import { Developer } from '../../../engine/models/developer';
import { EngineService } from 'src/app/modules/engine/services/engine.service';

@Component({
  selector: 'app-developers',
  styleUrls: ['developers.component.scss'],
  templateUrl: 'developers.component.html',
})
export class DevelopersComponent {
  constructor(private engine: EngineService) {}

  getDevelopers() {
    return this.engine.developerPool.developers;
  }
}
