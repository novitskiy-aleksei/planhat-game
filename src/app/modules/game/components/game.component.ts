import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Customer } from '../../engine/models/customer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private currentCustomer: Customer;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  callOut(customer) {
    this.currentCustomer = customer;
    this.modalService.open('phone-minigame-modal');
  }

  onGameEnded() {
    this.modalService.close('phone-minigame-modal');
  }

}
