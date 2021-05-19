import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (window.location.pathname == '/dashboard' && !localStorage.getItem('token_login')) {
      window.location.href = '/'
    } else if (localStorage.getItem('token_login') && window.location.pathname != '/dashboard') {
      this.router.navigate(['/dashboard'])
    }
  }
}
