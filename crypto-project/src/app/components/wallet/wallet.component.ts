import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoModel } from 'src/app/model/crypto';
import { CryptoInWalletInfo, Wallet } from 'src/app/model/wallet';
import { CryptoServiceService } from 'src/app/services/crypto-service.service';
import { UserService } from 'src/app/services/user.service';
import { DepositPaymentComponent } from '../deposit-payment/deposit-payment.component';
import { InputCardDataComponent } from '../input-card-data/input-card-data.component';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public username
  public wallet !: Wallet
  public worth: number = 0
  public cryptos: Array<CryptoModel> = []
  public cryptosInfo: Array<CryptoInWalletInfo> = []

  @ViewChild(DepositPaymentComponent)
  deposit!: DepositPaymentComponent

  @ViewChild(WithdrawalComponent)
  withdraw!: WithdrawalComponent

  constructor(private userService: UserService, private currencyService: CryptoServiceService) {
    this.username = localStorage.getItem('user')?.toString()
  }

  ngOnInit(): void {
    this.userService.getWallet(this.username || '')
      .subscribe(res => {
        this.wallet = res
        this.getWorthOfWallet()
      })
  }

  getWorthOfWallet() {
    this.wallet.cryptos.forEach((curr) => {
      this.currencyService.getCurrencyInfo(curr.cryptoID).subscribe(
        resp => {
          this.worth += curr.crypto * Number(resp.priceUsd)
          this.cryptos.push(resp)
          this.cryptosInfo.push({
            cryptoModel: resp,
            crypto: curr.crypto
          })
        })
    })
  }

  openDepositModal() {
    this.deposit.openDepositModal()
  }

  openWithdrawModal() {
    this.withdraw.openWithdrawModal()
  }
 
}
