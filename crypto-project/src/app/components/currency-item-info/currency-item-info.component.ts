import { Component, Input, OnInit } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';

@Component({
  selector: 'app-currency-item-info',
  templateUrl: './currency-item-info.component.html',
  styleUrls: ['./currency-item-info.component.css']
})
export class CurrencyItemInfoComponent implements OnInit {

  @Input()
  currency !: CryptoModel

  constructor() { }

  ngOnInit(): void {
  }

}
