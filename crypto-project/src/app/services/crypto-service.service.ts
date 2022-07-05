import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetsModel } from '../model/assets';
import { CryptoModel } from '../model/crypto';


@Injectable({

  providedIn: 'root'
})
export class CryptoServiceService {

  HOST = "https://api.coincap.io/v2/";

  constructor(private httpClient : HttpClient) { }

  public getCryptos() : Observable<AssetsModel[]> {
    return this.httpClient.get<AssetsModel[]>(this.HOST + "assets");
  }
}