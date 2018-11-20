import { Component, OnInit } from '@angular/core';
import { Emitter } from '../../../engine/services/emitter.service';
import { GameStatsEvent } from '../../../engine/models/models';
import { GameStats } from '../../../engine/models/game-stats';

@Component({
  selector: 'app-game-stats',
  styleUrls: ['game-stats.component.scss'],
  templateUrl: 'game-stats.component.html',
})
export class GameStatsComponent implements OnInit {
  private readonly HEALTH_LEVEL_GREEN = 4.5;
  private readonly HEALTH_LEVEL_YELLOW = 3.5;
  private readonly HEALTH_LEVEL_RED = 2;

  stats: GameStats = new GameStats({});

  constructor(private emitter: Emitter) {}

  ngOnInit() {
    this.emitter.on<GameStatsEvent>(GameStatsEvent.name).subscribe(stats => this.onGameStats(stats));
  }

  onGameStats(event: GameStatsEvent) {
    this.stats = event.stats;
    if (!this.stats.averageCustomerHealth) {
      this.stats.averageCustomerHealth = 0;
    }
    this.stats.averageCustomerHealth = Number(this.stats.averageCustomerHealth.toFixed(1));
  }

  healthColor() {
    if (this.stats.averageCustomerHealth > this.HEALTH_LEVEL_GREEN) {
      return 'green';
    } else if (this.stats.averageCustomerHealth > this.HEALTH_LEVEL_YELLOW) {
      return 'yellow';
    } else if (this.stats.averageCustomerHealth > this.HEALTH_LEVEL_RED) {
      return 'red';
    } else {
      return 'dark';
    }
  }
}
