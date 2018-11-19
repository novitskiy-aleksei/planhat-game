import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { WelcomeModule } from './modules/welcome/welcome.module';
import { GameModule } from './modules/game/game.module';
import { EngineModule } from './modules/engine/engine.module';
import { GamePanelModule } from './modules/game-panel/game-panel.module';
import { ScoresModule } from './modules/scores/scores.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    EngineModule,
    WelcomeModule,
    GameModule,
    GamePanelModule,
    ScoresModule,
    BrowserModule,
    EngineModule
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
