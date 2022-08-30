import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = ''
  public password = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe(
        resp => {
          localStorage.setItem('token', resp.token)
          localStorage.setItem('user', resp.username)
          this.router.navigate(['/currencies'])
        }, 
        err => {
          alert('Login failed: ' + err.error.msg)
        }
      )
  }

}
