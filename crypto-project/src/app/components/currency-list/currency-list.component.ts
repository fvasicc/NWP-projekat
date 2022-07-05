import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoServiceService } from 'src/app/services/crypto-service.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  currencies !: CryptoModel[]

  constructor(private currencyServic : CryptoServiceService) { }

  ngOnInit(): void {
    this.currencies = [
      {
        "id": "bitcoin",
        "rank": "1",
        "symbol": "BTC",
        "name": "Bitcoin",
        "supply": "17193925.0000000000000000",
        "maxSupply": "21000000.0000000000000000",
        "marketCapUsd": "119150835874.4699281625807300",
        "volumeUsd24Hr": "2927959461.1750323310959460",
        "priceUsd": "6929.82",
        "changePercent24Hr": "-0.81",
        "vwap24Hr": "7175.06"
      },
      {
        "id": "ethereum",
        "rank": "2",
        "symbol": "ETH",
        "name": "Ethereum",
        "supply": "101160540.0000000000000000",
        "maxSupply": null,
        "marketCapUsd": "40967739219.6612727047843840",
        "volumeUsd24Hr": "1026669440.6451482672850841",
        "priceUsd": "404.97",
        "changePercent24Hr": "-0.09",
        "vwap24Hr": "415.32"
      }
    ]
  }

}
