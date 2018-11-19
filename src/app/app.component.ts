import { Component } from '@angular/core';
import { EngineService } from './modules/engine/services/engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(engine: EngineService) {
    engine.initGameData();
  }

}
