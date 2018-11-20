import { Component } from '@angular/core';
import { Developer } from '../../../engine/models/developer';
import { EngineService } from 'src/app/modules/engine/services/engine.service';
import { Emitter } from '../../../engine/services/emitter.service';
import { TaskFinishedEvent } from '../../../engine/models/models';

@Component({
  selector: 'app-developers',
  styleUrls: ['developers.component.scss'],
  templateUrl: 'developers.component.html',
})
export class DevelopersComponent {
  constructor(private engine: EngineService, private emitter: Emitter) {}

  getDevelopers() {
    return this.engine.developerPool.developers;
  }

  deliverToClient(developer: Developer) {
    this.emitter.emit(TaskFinishedEvent.name, new TaskFinishedEvent(developer));
  }
}
