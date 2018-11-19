import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Player } from '../../../auth/player';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  username = '';

  constructor(private authService: AuthService) {
  }

  startGame() {
    if (!this.username.length) {
      return null;
    }

    const player = new Player(this.username);
    this.authService.login(player);
  }
}
