import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game.component';
import { BoardComponent } from './components/board/board.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CustomerComponent } from './components/customer/customer.component';
import { GamePanelModule } from '../game-panel/game-panel.module';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  imports: [
    CommonModule,
    GamePanelModule
  ],
  declarations: [
    GameComponent,
    BoardComponent,
    TimelineComponent,
    CustomerComponent,
    ModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class GameModule {
}
