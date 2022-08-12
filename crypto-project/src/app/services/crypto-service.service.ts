import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  private sortByName = -1;

  public getCryptosSortedByName(limit: number) : Observable<CryptoModel[]> {
    // return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.rank) < Number(b.rank) ? -1 : 1)))
    this.sortByName *= -1
    return this.sort(limit, (a : CryptoModel, b : CryptoModel)=> a.name < b.name ? this.sortByName : this.sortByName * -1)
  }
  

  private sortByVWAP24hConst = -1;

  public getCryptosSortedBy24hVWAP(limit: number) : Observable<CryptoModel[]> {
    // return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.rank) < Number(b.rank) ? -1 : 1)))
    this.sortByVWAP24hConst *= -1
    return this.sort(limit, (a : CryptoModel, b : CryptoModel)=> Number(a.vwap24Hr) < Number(b.vwap24Hr) ? this.sortByVWAP24hConst : this.sortByVWAP24hConst * -1)
  }

  private sortByPriceConst = -1;

  public getCryptosSortedByPrice(limit: number) : Observable<CryptoModel[]> {
    // return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.priceUsd) < Number(b.priceUsd) ? 1 : -1)))
    this.sortByPriceConst *= -1
    return this.sort(limit, (a : CryptoModel, b : CryptoModel)=> Number(a.priceUsd) < Number(b.priceUsd) ? this.sortByPriceConst : this.sortByPriceConst * -1)
  }

  private sortByRankConst = -1;

  public getCryptosSortedByRank(limit: number) : Observable<CryptoModel[]> {
    // return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.rank) < Number(b.rank) ? -1 : 1)))
    this.sortByRankConst *= -1
    return this.sort(limit, (a : CryptoModel, b : CryptoModel)=> Number(a.rank) < Number(b.rank) ? this.sortByRankConst : this.sortByRankConst * -1)
  }

  private sortBy24hchangeConst = -1;

  public getCryptosSortedBy24hChange(limit: number) : Observable<CryptoModel[]> {
    // return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort((a,b)=> Number(a.changePercent24Hr) < Number(b.changePercent24Hr) ? 1 : -1)))
    this.sortBy24hchangeConst *= -1
    return this.sort(limit, (a : CryptoModel, b : CryptoModel)=> Number(a.changePercent24Hr) < Number(b.changePercent24Hr) ? this.sortBy24hchangeConst : this.sortBy24hchangeConst * -1)
  }

  private sort(limit: number, sortRule : any) {
    return this.getAssetsWithlimit(limit).pipe(map(ass => ass.data.sort(sortRule)))
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

  public getCurrencyInfo(id : string): Observable<CryptoModel>{
    return this.httpClient.get<CryptoModel>(this.HOST + "assets/" + id).pipe(map((res: any) => { return res.data }))
  }
}