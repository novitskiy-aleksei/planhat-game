import { Component } from '@angular/core';
import { EngineService } from './modules/engine/services/engine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(engine: EngineService) {
    engine.initGameData();
  }

}
