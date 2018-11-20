import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePanelComponent } from './components/game-panel.component';
import { GameStatsComponent } from './components/game-stats/game-stats.component';
import { LoggerComponent } from './components/logger/logger.component';
import { DevelopersComponent } from './components/developers/developers.component';

@NgModule({
  imports: [CommonModule],
  exports: [GamePanelComponent],
  declarations: [
    GameStatsComponent,
    LoggerComponent,
    DevelopersComponent,
    GamePanelComponent,
  ]
})
export class GamePanelModule { }
