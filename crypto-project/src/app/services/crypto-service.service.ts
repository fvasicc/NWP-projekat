import { HttpClient } from '@angular/common/http';
import { assertPlatform, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AssetsModel } from '../model/assets';
import { CryptoModel } from '../model/crypto';
import { AssetsHistoryModel, CryptoHistoryModel } from '../model/crypto-history';


@Injectable({

  providedIn: 'root'
})
export class CryptoServiceService {

  HOST = "https://api.coincap.io/v2/";

  private currencies !: Observable<CryptoModel[]>
  
  constructor(private httpClient : HttpClient) { }

  public getCryptos(limit : number) : Observable<CryptoModel[]> {
    return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data)) 
  }

  public getAssets() : Observable<AssetsModel> {
    return this.httpClient.get<AssetsModel>(this.HOST + "assets")
  }
  
  public getAssetsWithlimit(limit : number) : Observable<AssetsModel> {
    return this.httpClient.get<AssetsModel>(this.HOST + "assets?limit=" + limit)
  }

  public getCryptosSortedByPrice(limit: number) : Observable<CryptoModel[]> {
    return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.priceUsd) < Number(b.priceUsd) ? 1 : -1)))
  }

  public getCryptosSortedByRank(limit: number) : Observable<CryptoModel[]> {
    return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.rank) < Number(b.rank) ? -1 : 1)))
  }

  public getCryptosSortedBy24hChange(limit: number) : Observable<CryptoModel[]> {
    return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.changePercent24Hr) < Number(b.changePercent24Hr) ? 1 : -1)))
  }
  
  public getHistoryForCrypto(id : String, interval : String, start? : number, end? : number) : Observable<CryptoHistoryModel[]> {
    return this.getHistoryAssets(id, interval, start, end).pipe(map(ass => ass.data))
  }

  public getHistoryAssets(id : String, interval : String, start? : number, end? : number) : Observable<AssetsHistoryModel> {
    if (start === undefined || end === undefined)
      return this.httpClient.get<AssetsHistoryModel>(this.HOST + "assets/" + id +"/history?interval=" + interval)
    else 
      return this.httpClient.get<AssetsHistoryModel>(this.HOST + "assets/" + id +"/history?interval=" + interval + "&start=" + start + "&end=" + end)
  }

}