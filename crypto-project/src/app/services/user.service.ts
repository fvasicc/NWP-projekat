import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PasswordChangeData } from '../model/password-change';
import { LoggedUserDto } from '../model/user';
import { Wallet } from '../model/wallet';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  BACKEND_BASE = "http://localhost:3000/api/user/"

  login(username: String, password: String): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + 'login', {
      username: username,
      password: password
    })
    .pipe(map(res => { return res }))
  }

  register(user: any): Observable<any> {
    console.log(user)
    return this.httpClient.post(this.BACKEND_BASE + 'register', user).pipe(map(res => { return res }))
  }

  logout() {
    console.log('Logout method is called')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/currencies'])
    setTimeout(() => window.location.reload(), 100)
  }

  isLoggedIn() {
    if (localStorage.getItem('token'))
      return true
    else
      return false
  }

  getUserInfo(username: string) {
    return this.httpClient.get<LoggedUserDto>(this.BACKEND_BASE + 'userInfo/' + username)
  }

  buyCrypto(username: string, currencyId: string, usdValue: number, cryptoValue: number) {
    return this.httpClient.patch(this.BACKEND_BASE + 'wallet/buy', {
      username: username,
      usdValue: usdValue,
      cryptoID: currencyId,
      cryptoValue: cryptoValue
    }).pipe(map(res => { return res }))
  }

  sellCrypto(username: string, currencyId: string, usdValue: number, cryptoValue: number) {
    return this.httpClient.patch(this.BACKEND_BASE + 'wallet/sell', {
      username: username,
      usdValue: usdValue,
      cryptoID: currencyId,
      cryptoValue: cryptoValue
    }).pipe(map(res => { return res }))
  }

  getWallet(username: string): Observable<Wallet> {
    return this.httpClient.get<Wallet>(this.BACKEND_BASE + 'wallet/' + username)
  }

  changePassword(data: PasswordChangeData) {
    return this.httpClient.patch(this.BACKEND_BASE + 'changePassword/' + data.username, data)
  }

  deposit(data: any) {
    return this.httpClient.patch(this.BACKEND_BASE + 'wallet/deposit', {
      username: data.username,
      usd: data.usd
    })
  }

  withdraw(data: any) {
    return this.httpClient.patch(this.BACKEND_BASE + 'wallet/withdraw', {
      username: data.username,
      usd: data.usd
    })
  }
}
