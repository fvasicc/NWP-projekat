import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InputCardDataComponent } from '../input-card-data/input-card-data.component';

@Component({
  selector: 'app-deposit-payment',
  templateUrl: './deposit-payment.component.html',
  styleUrls: ['./deposit-payment.component.css']
})
export class DepositPaymentComponent implements OnInit {

  @ViewChild(InputCardDataComponent)
  inputCardForm!: InputCardDataComponent
  public usd!: number

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  display = "none"

  openDepositModal() {
    this.display = "block"
  }
  
  onCloseHandled() {
    this.display = "none"
  }

  pay() {
    this.userService.deposit({
      username: localStorage.getItem('user')?.toString(),
      usd: this.usd,
      card: this.inputCardForm.getCardData()
    }).subscribe( (resp: any) => {
      alert(resp.msg)
      this.usd = 0
      window.location.reload()
    }, err => {
      alert(err.error.msg)
    }
    )
  }

}
 