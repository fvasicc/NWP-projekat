import { Component, Input, OnInit } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoServiceService } from 'src/app/services/crypto-service.service';


@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.css']
})
export class CurrencyItemComponent implements OnInit {

  @Input()
  currency !: CryptoModel

  collapsed = false;

  changeCollapse() {
    this.collapsed = ! this.collapsed;
  }

  constructor(private cryptoService : CryptoServiceService) {}

  ngOnInit(): void {
  }
  
  isChangePercent24HrNegative() {
    return Number(this.currency.changePercent24Hr) < 0.0
  }
}
