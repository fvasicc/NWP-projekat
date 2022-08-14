import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-card-data',
  templateUrl: './input-card-data.component.html',
  styleUrls: ['./input-card-data.component.css']
})
export class InputCardDataComponent implements OnInit {

  public cNumber = ''
  public cvv = ''
  public expDate = null

  constructor() { }

  ngOnInit(): void {
  }

  getCardData() {
    return {
      number: this.cNumber,
      expirationDate: this.expDate,
      cvv: this.cvv
    }
  }

}
