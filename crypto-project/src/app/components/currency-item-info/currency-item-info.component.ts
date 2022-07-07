import { Component, Input, OnInit } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { CryptoServiceService } from 'src/app/services/crypto-service.service';
import { CryptoHistoryModel } from 'src/app/model/crypto-history';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-currency-item-info',
  templateUrl: './currency-item-info.component.html',
  styleUrls: ['./currency-item-info.component.css']
})
export class CurrencyItemInfoComponent implements OnInit {

  public lineChartData !: ChartConfiguration<'line'>['data']
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  @Input()
  currency !: CryptoModel

  private labelValues : Array<string> = []
  private dataValues : Array<number> = []
  private info !: CryptoHistoryModel[]

  todayOpen !: number
  priceUsd !: number

  value : number = 0

  constructor(private currencyService: CryptoServiceService) { }

  ngOnInit(): void {
    this.todayOpen = Number(this.currency.vwap24Hr)
    this.priceUsd = Number(this.currency.priceUsd)
    // this.getChart(this.interval)
    this.lineChartData = {
      labels: this.labelValues,
      datasets: [
        {
          data: this.dataValues,
          label: this.currency.name,
          fill: true,
          tension: 0.1,
          borderColor: this.dataValues[0] < this.dataValues[this.dataValues.length - 1] ? 'green' : 'red',
          backgroundColor: this.dataValues[0] < this.dataValues[this.dataValues.length - 1] ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)',
          pointRadius: 0,
          borderWidth: 2
        }
      ]
    }
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
      this.info = res

      this.labelValues = []
      this.dataValues = []

      for (let i = 0; i < this.info.length; i++) {
        const element = this.info[i];
        this.labelValues.push(new Date(element.time).toLocaleString("en-GB"))
        this.dataValues.push(Number(element.priceUsd))
      }

      this.lineChartData = {
        labels: this.labelValues,
        datasets: [
          {
            data: this.dataValues,
            label: this.currency.name,
            fill: true,
            tension: 0.1,
            borderColor: this.dataValues[0] < this.dataValues[this.dataValues.length - 1] ? 'green' : 'red',
            backgroundColor: this.dataValues[0] < this.dataValues[this.dataValues.length - 1] ? 'rgba(0,255,0,0.3)' : 'rgba(255,0,0,0.3)',
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      }
    })
  }

  public setValue(n : String) {
    this.value = Number(n) * Number(this.currency.priceUsd)
  }
}
