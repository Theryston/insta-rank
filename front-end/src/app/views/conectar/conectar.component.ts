import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conectar',
  templateUrl: './conectar.component.html',
  styleUrls: ['./conectar.component.css']
})
export class ConectarComponent implements OnInit {
  user = { email: '', password: '' }

  constructor(private userService: UserService) {
    this.user = { email: '', password: '' }
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.userService.auth(this.user).subscribe((res) => {
      localStorage.setItem('token_login', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      if (!res.user.instagram_token) {
        window.location.href = 'https://www.instagram.com/oauth/authorize?client_id=260917165732736&redirect_uri=https://instarank.prsacademy.com.br/auth&response_type=code&scope=user_profile,user_media'
      }
      window.location.href = '/';
    })
  }

}
