import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AssetsModel } from '../model/assets';
import { CryptoModel } from '../model/crypto';


@Injectable({

  providedIn: 'root'
})
export class CryptoServiceService {

  HOST = "https://api.coincap.io/v2/";

  private currencies !: Observable<CryptoModel[]>
  
  constructor(private httpClient : HttpClient) { }

  public getCryptos(length : number) : Observable<CryptoModel[]> {
    return this.getAssets().pipe(map(ass => ass.data.slice(0, length)))
    
  }

  public getAssets() : Observable<AssetsModel> {
    return this.httpClient.get<AssetsModel>(this.HOST + "assets");
  }

  public getCryptosSortedByPrice(length: number) : Observable<CryptoModel[]> {
    return this.getAssets().pipe(map(ass => ass.data.slice(0, length).sort((a,b)=> Number(a.priceUsd) < Number(b.priceUsd) ? 1 : -1)))
  }

  public getCryptosSortedByRank(length: number) : Observable<CryptoModel[]> {
    return this.getAssets().pipe(map(ass => ass.data.slice(0, length).sort((a,b)=> Number(a.rank) < Number(b.rank) ? -1 : 1)))
  }

  public getCryptosSortedBy24hChange(length: number) : Observable<CryptoModel[]> {
    return this.getAssets().pipe(map(ass => ass.data.slice(0, length).sort((a,b)=> Number(a.changePercent24Hr) < Number(b.changePercent24Hr) ? 1 : -1)))
  }
  
}