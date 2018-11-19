import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EngineModule } from './modules/engine/engine.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EngineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
