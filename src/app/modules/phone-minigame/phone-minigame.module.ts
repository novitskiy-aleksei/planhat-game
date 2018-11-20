import { NgModule } from '@angular/core';
import { PhoneMiniGameComponent } from './components/phone-minigame.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PhoneMiniGameComponent],
  exports: [PhoneMiniGameComponent],
  imports: [CommonModule],
})
export class PhoneMiniGameModule {
}
