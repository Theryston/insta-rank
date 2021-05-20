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
      window.location.href = '/';
    })
  }

}
