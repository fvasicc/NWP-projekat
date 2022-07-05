import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoModel } from '../model/crypto';

@Injectable({

  providedIn: 'root'
})
export class CryptoServiceService {

  HOST = "https://api.coincap.io/v2/";

  constructor(private httpClient : HttpClient) { }

  public getCryptos() : Observable<CryptoModel[]> {
    return this.httpClient.get<CryptoModel[]>(this.HOST + "assets");
  }
}
