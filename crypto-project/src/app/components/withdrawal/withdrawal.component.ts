import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InputCardDataComponent } from '../input-card-data/input-card-data.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  @ViewChild(InputCardDataComponent)
  inputCardForm!: InputCardDataComponent
  public usd!: number

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  display = "none"

  openWithdrawModal() {
    this.display = "block"
  }
  
  onCloseHandled() {
    this.display = "none"
  }

  withdraw() {
    this.userService.withdraw({
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
