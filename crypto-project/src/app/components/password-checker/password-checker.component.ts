import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css']
})
export class PasswordCheckerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  len = false
  upper = false
  lower = false
  number = false
  symbol = false

  onKey(inputValue: string) {
    this.len = false
    this.upper = false
    this.lower = false
    this.number = false
    this.symbol = false
    if (inputValue.length >= 8)
      this.len = true
    for (let i = 0; i < inputValue.length; i++) {
      let char = inputValue.charAt(i)
      if (char >= '0' && char <= '9')
        this.number = true
      else if (char === '!' || char === '$' || char == '.')
        this.symbol = true
      else {
        if (char == char.toUpperCase())
          this.upper = true
        if (char == char.toLowerCase())
          this.lower = true
      }
    }
  }

  isPasswordOk() {
    return this.upper && this.lower && this.number && this.symbol && this.len
  }

}
