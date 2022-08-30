import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  msg: string
  error: string
  buttonText: string

  constructor(private router: Router, private actRoute: ActivatedRoute) { 
    this.msg = actRoute.snapshot.data['msg']
    this.error = actRoute.snapshot.data['error']
    this.buttonText = actRoute.snapshot.data['buttonText']
  }

  ngOnInit(): void {

  }

  goToHomepage() {
    this.router.navigate([this.actRoute.snapshot.data['route']])
  }

}
