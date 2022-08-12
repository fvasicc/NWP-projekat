import { Component, Input, OnInit } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoInWalletInfo } from '../../model/wallet'

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent implements OnInit {

  @Input()
  crypto!: CryptoInWalletInfo

  value : number = 0

  constructor() { }

  ngOnInit(): void {
    this.value = this.crypto.crypto * Number(this.crypto.cryptoModel.priceUsd)
  }

}
