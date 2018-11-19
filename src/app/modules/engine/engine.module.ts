import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineService } from './services/engine.service';
import { Emitter } from './services/emitter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    EngineService,
    Emitter
  ]
})
export class EngineModule { }
