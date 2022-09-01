import { Component, Input, OnInit } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { CryptoServiceService } from 'src/app/services/crypto-service.service';
import { RatesModel } from 'src/app/model/rates';
import { RatesService } from 'src/app/services/rates.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-currency-item-info',
  templateUrl: './currency-item-info.component.html',
  styleUrls: ['./currency-item-info.component.css']
})
export class CurrencyItemInfoComponent implements OnInit {

  public lineChartData !: ChartConfiguration<'line'>['data']
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  @Input()
  currency !: CryptoModel

  value : number = 0
  rates !: Array<RatesModel>

  selectedRate !: RatesModel

  constructor(private currencyService: CryptoServiceService, private ratesService : RatesService, private userService: UserService) { }

  ngOnInit(): void {
    this.getChart("m15", 0.1)
    this.ratesService.getRates().subscribe(res => this.rates = res)
  }

  isAuthorized() {
    return this.userService.isLoggedIn()
  }

  getChart(interval: string, days? : number): void {

    let start = undefined
    let end = undefined

    if (days !== undefined) {
      let date = new Date()
      end = date.getTime()
      start = new Date(date.getTime() - days * 24 * 60 * 60 * 1000).getTime()
    }

    this.currencyService.getHistoryForCrypto(this.currency.id, interval, start, end).subscribe(res => {

      let labelValues = []
      let dataValues = []

      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        labelValues.push(new Date(element.time).toLocaleString("en-GB"))
        dataValues.push(Number(element.priceUsd))
      }

      this.lineChartData = {
        labels: labelValues,
        datasets: [
          {
            data: dataValues,
            label: this.currency.name,
            fill: true,
            tension: .4,
            borderColor: dataValues[0] < dataValues[dataValues.length - 1] ? 'green' : 'red',
            backgroundColor: dataValues[0] < dataValues[dataValues.length - 1] ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      }
    })
  }

  public setValue(n : String) {
    let num = Number(n)
    if (num >= 0)
      this.value = num * Number(this.currency.priceUsd) / Number(this.selectedRate.rateUsd)
  }
}
