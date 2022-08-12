import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CryptoModel } from 'src/app/model/crypto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-currency-transaction',
  templateUrl: './currency-transaction.component.html',
  styleUrls: ['./currency-transaction.component.css']
})
export class CurrencyTransactionComponent implements OnInit {

  @Input()
  currency!: CryptoModel

  isBuy = true;

  inputValue : number = 0
  convertedValue: number = 0 

  private reloadState : Subject<void> = new Subject();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onKeyBuy(event: any) { 
    this.inputValue = event.target.value
    this.convertedValue =  event.target.value / Number(this.currency.priceUsd) * 0.995
  }

  onKeySell(event: any) { 
    this.inputValue = event.target.value
    this.convertedValue = Number(this.currency.priceUsd) * event.target.value * 0.995
  }

  onBuyButtonClick() {
    this.isBuy = true
    this.convertedValue = 0
  }

  onSellButtonClick() {
    this.isBuy = false
    this.convertedValue = 0
  }

  buy() {
    this.userService.buyCrypto(localStorage.getItem('user') || '', this.currency.id, this.inputValue, this.convertedValue)
    .subscribe((resp: any) => {
      alert(resp.msg)
      window.location.reload()
    }, 
    err => {
      alert(err.error.msg)
    })
  }

  sell() {
    this.userService.sellCrypto(localStorage.getItem('user') || '', this.currency.id, this.convertedValue, this.inputValue)
    .subscribe((resp: any) => {
      alert(resp.msg)
      window.location.reload()
    }, 
    err => {
      alert(err.error.msg)
    })
  }

}
