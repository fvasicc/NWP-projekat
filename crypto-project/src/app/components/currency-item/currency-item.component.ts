import { Component, Input, OnInit } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoServiceService } from 'src/app/services/crypto-service.service';


@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.css']
})
export class CurrencyItemComponent implements OnInit {

  @Input()
  currency !: CryptoModel

  changePercent24Hr !: number
  priceUsd !: number
  vwap24Hr !: number

  constructor(private cryptoService : CryptoServiceService) {}

  ngOnInit(): void {
    this.changePercent24Hr = Number(this.currency.changePercent24Hr)
    this.priceUsd = Number(this.currency.priceUsd)
    this.vwap24Hr = Number(this.currency.vwap24Hr)
  }

}
