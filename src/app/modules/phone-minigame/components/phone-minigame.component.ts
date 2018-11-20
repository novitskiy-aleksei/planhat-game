import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-phone-minigame',
  styleUrls: ['phone-minigame.component.scss'],
  templateUrl: 'phone-minigame.component.html',
})
export class PhoneMiniGameComponent implements OnInit {
  input = '';
  buttons = new Array(10);
  target = '';
  timesCache = new Map<number, number[]>();

  @Output() complete: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.target = this.generatePhone();
    this.buttons = this.generateButtons();
  }

  buttonClick(number) {
    if (this.input.length === 9) {
      return;
    }
    this.input += number;
    this.buttons = this.generateButtons();
  }

  callClick() {
    if (this.input === this.target) {
      this.complete.emit(true);
    } else {
      this.complete.emit(false);
    }
  }

  eraseClick() {
    if (this.input.length > 0) {
      this.input = this.input.substr(0, this.input.length - 1);
      this.buttons = this.generateButtons();
    }
  }

  cancelClick() {
    this.complete.emit(false);
  }

  generatePhone() {
    const min = 1000000;
    const max = 9999999;
    return String(Math.floor(Math.random() * (max - min) ) + min);
  }

  generateButtons() {
    const buttons = new Array(10);
    for (let i = 0; i < 10; i++) {
      buttons[i] = i;
    }
    return this.shuffleArray(buttons);
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  times(n) {
    if (!this.timesCache.get(n)) {
      this.timesCache.set(n, new Array(n));
    }
    return this.timesCache.get(n);
  }
}
