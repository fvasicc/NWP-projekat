import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoServiceService } from 'src/app/services/crypto-service.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  currencies !: Observable<CryptoModel[]>

  constructor(private currencyService : CryptoServiceService) { }

  ngOnInit(): void {
   this.currencyService.getAssets().subscribe(c => this.currencies = of(c.data));
  }

}
