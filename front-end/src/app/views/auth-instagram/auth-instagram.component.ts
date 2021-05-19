import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-instagram',
  templateUrl: './auth-instagram.component.html',
  styleUrls: ['./auth-instagram.component.css']
})
export class AuthInstagramComponent implements OnInit {

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    var user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.router.queryParams.subscribe(params => {
      user.instagram_token = params.code
      this.userService.update(user).subscribe(() => {
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/';
      })
    })
  }

}
