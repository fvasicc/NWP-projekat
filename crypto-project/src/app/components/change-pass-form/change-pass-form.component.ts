import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PasswordChangeData } from '../../model/password-change'
import { PasswordCheckerComponent } from '../password-checker/password-checker.component';

@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-form.component.html',
  styleUrls: ['./change-pass-form.component.css']
})
export class ChangePassFormComponent implements OnInit {

  @Output()
  passwordChange: EventEmitter<PasswordChangeData> = new EventEmitter()

  @ViewChild(PasswordCheckerComponent) 
  passwordCheckerComp!: PasswordCheckerComponent

  newPass = ''
  confPass = ''
  oldPass = ''

  msg = ''

  constructor() { }

  ngOnInit(): void {
  }

  changePassword(form: any) {
    if (!form.invalid) {
      if (this.newPass !== this.confPass)
        this.msg = 'Input is wrong. Passwords are different'
      else {
        this.passwordChange.emit({
          username: localStorage.getItem('user') || '',
          currentPassword: this.oldPass,
          newPassword: this.newPass,
          newPasswordConfirmation: this.confPass
        })
      }
    }
  }

  onKey(event: any) {
    this.passwordCheckerComp.onKey(event.target.value)
  }

}
