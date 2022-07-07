import { HttpClient } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AssetsRatesModel, RatesModel } from '../model/rates';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  HOST = "https://api.coincap.io/v2/";

  constructor(private httpClient : HttpClient) { }
  
  public getRatesAssets() : Observable<AssetsRatesModel> {
    return this.httpClient.get<AssetsRatesModel>(this.HOST + "rates")
  }

  public getRates() : Observable<RatesModel[]> {
    return this.getRatesAssets().pipe(map(ass => ass.data))
  }

  
}

