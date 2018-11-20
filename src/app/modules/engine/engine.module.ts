import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineService } from './services/engine.service';
import { Emitter } from './services/emitter.service';
import { CustomersService } from './services/customers.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    EngineService,
    CustomersService,
    Emitter
  ]
})
export class EngineModule { }
