import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
