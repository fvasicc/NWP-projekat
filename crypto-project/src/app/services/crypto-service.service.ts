import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssetsModel } from '../model/assets';
import { CryptoModel } from '../model/crypto';


@Injectable({

  providedIn: 'root'
})
export class CryptoServiceService {

  HOST = "https://api.coincap.io/v2/";

  currencies = [
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
  
  constructor(private httpClient : HttpClient) { }

  public getCryptos() : Observable<CryptoModel[]> {
    this.httpClient.get<AssetsModel>(this.HOST + "assets")
    return of(this.currencies)
  }

  public getAssets() : Observable<AssetsModel> {
    return this.httpClient.get<AssetsModel>(this.HOST + "assets");
  }
}