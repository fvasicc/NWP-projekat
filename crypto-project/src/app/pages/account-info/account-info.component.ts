import { Component, OnInit } from '@angular/core';
import { PasswordChangeData } from 'src/app/model/password-change';
import { LoggedUserDto } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  user!: LoggedUserDto
  passMenu = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo(localStorage.getItem('user') || '').subscribe(resp => this.user = resp)
    this.passMenu = false
  }

  openNewPasswordMenu() {
    this.passMenu = !this.passMenu
  }

  onPasswordChange(change: PasswordChangeData) {
    this.userService.changePassword(change).subscribe(
      (resp: any) => alert(resp.msg),
      err => alert(err.error.msg)
    )
  }

}
