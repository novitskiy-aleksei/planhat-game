import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable()
export class AuthService {
  player: Player;

  constructor() {
    const playerJson = localStorage.getItem('player');
    if (playerJson) {
      this.player = new Player(JSON.parse(playerJson));
    }
  }

  isAuthenticated(): boolean {
    return !!this.player;
  }

  login(player: Player) {
    this.player = player;
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = '/game';
  }

  logout() {
    this.player = null;
    localStorage.removeItem('player');
  }
}
