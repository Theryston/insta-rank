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
    if (window.location.pathname == '/auth') {
    } else if (window.location.pathname == '/dashboard') {
      var user: any = localStorage.getItem('user')
      if (JSON.parse(user).instagram_token == null) {
        window.location.href = 'https://www.instagram.com/oauth/authorize?client_id=260917165732736&redirect_uri=https://instarank.prsacademy.com.br/auth&response_type=code&scope=user_profile,user_media'
      }
    } else if (window.location.pathname == '/dashboard' && !localStorage.getItem('token_login')) {
      window.location.href = '/'
    } else if (localStorage.getItem('token_login') && window.location.pathname != '/dashboard') {
      this.router.navigate(['/dashboard'])
    }
  }
}
