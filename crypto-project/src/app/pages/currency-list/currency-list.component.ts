import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoServiceService } from 'src/app/services/crypto-service.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css'],
})
export class CurrencyListComponent implements OnInit {

  currencies !: Observable<CryptoModel[]>

  private listedCurrency : number = 20;
  private reloadCurrency : Subject<void> = new Subject();

  constructor(private currencyService : CryptoServiceService) { }

  ngOnInit(): void {
    this.currencies = this.currencyService.getCryptos(this.listedCurrency)
  }

  sortByName() {
    this.currencyService.getCryptosSortedByName(this.listedCurrency).subscribe( c => {
      this.currencies = of(c)
      this.reloadCurrency.next()
    })
  }

  sortByVWAP() {
    this.currencyService.getCryptosSortedBy24hVWAP(this.listedCurrency).subscribe( c => {
      this.currencies = of(c)
      this.reloadCurrency.next()
    })
  }

  sortByPrice() {
    this.currencyService.getCryptosSortedByPrice(this.listedCurrency).subscribe(c => { 
      this.currencies = of(c)
      this.reloadCurrency.next()
    });
  }

  sortByRank() {
    this.currencyService.getCryptosSortedByRank(this.listedCurrency).subscribe(c => { 
      this.currencies = of(c)
      this.reloadCurrency.next()
    });
  }

  sortByGrowth() {
    this.currencyService.getCryptosSortedBy24hChange(this.listedCurrency).subscribe(c => { 
      this.currencies = of(c)
      this.reloadCurrency.next()
    });
  }

  loadMore() : void{
    this.load(20)
  }

  loadLess() : void{
    this.load(-20)
  }

  load(n : number) : void {
    this.listedCurrency += n;
    this.currencyService.getCryptos(this.listedCurrency).subscribe(c => { 
          this.currencies = of(c)
          this.reloadCurrency.next()
        });
  }

  noMoreLoad() : boolean {
    return this.listedCurrency === 220;
  }

  noLessLoad() : boolean {
    return this.listedCurrency === 20;
  }

  reload() {
    this.reloadCurrency.next()
  }
}
