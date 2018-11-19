import { Routes } from '@angular/router';

import { WelcomeComponent } from './modules/welcome/components/welcome.component';
import { GameComponent } from './modules/game/components/game.component';
import { AuthGuard } from './auth/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [],
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [AuthGuard]
  },
];
