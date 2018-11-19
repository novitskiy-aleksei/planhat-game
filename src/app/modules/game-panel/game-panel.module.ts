import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePanelComponent } from './components/game-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [GamePanelComponent],
  declarations: [GamePanelComponent]
})
export class GamePanelModule { }
