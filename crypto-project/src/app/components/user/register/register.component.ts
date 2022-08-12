import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserDto } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { PasswordCheckerComponent } from '../../password-checker/password-checker.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild(PasswordCheckerComponent) 
  passwordCheckerComp!: PasswordCheckerComponent

  registerUserData: RegisterUserDto = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    zip: 0,
    age: 0,
    sex: 'Male',
    imageUrl: ''
  }

  passwordConfirm = ''
  emailConfirm = ''

  public messagePass = ''
  public messageMail = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  register(form: any) {
    if (!form.invalid) {
      if (this.registerUserData.password !== this.passwordConfirm)
        this.messagePass = 'Passwords are different'
      else if (this.registerUserData.email !== this.emailConfirm)
        this.messageMail = 'Mails are different'
      else if(this.passwordCheckerComp.isPasswordOk()) 
        this.messageMail = 'Password is not good'
      else {
        this.messageMail = ''
        this.messagePass = ''
        if (this.registerUserData.sex === 'Male')
          this.registerUserData.imageUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        else
          this.registerUserData.imageUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        this.userService.register(
          this.registerUserData
        ).subscribe((resp: any) => {
          alert(resp.msg);
          this.router.navigate(['/login']);
        }, 
        err => {
          alert('Registration failed: ' + err.error.msg)
        })
      }
    }
  }
  
  onKey(event: any) {
    this.passwordCheckerComp.onKey(event.target.value)
  }

}
