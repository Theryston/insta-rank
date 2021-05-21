import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-auth-instagram',
  templateUrl: './auth-instagram.component.html',
  styleUrls: ['./auth-instagram.component.css']
})
export class AuthInstagramComponent implements OnInit {

  constructor(private router: ActivatedRoute, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    var user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    this.router.queryParams.subscribe(async (queryParams) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        const url = "https://api.instagram.com/oauth/access_token"
        const params = new URLSearchParams()
        params.append('client_id', '260917165732736')
        params.append('client_secret', 'b12a84e13f6f71a15351d97eab64ef61')
        params.append('grant_type', 'authorization_code')
        params.append('redirect_uri', 'https://4200-maroon-turkey-xsybm1cb.ws-us04.gitpod.io/auth')
        params.append('code', queryParams.code)
        const res = await axios.post(url, params, config)
        console.log(res)
        user.instagram_token = res.data.access_token
        user.instagram_id = res.data.user_id
        // this.userService.update(user).subscribe(() => {
        //   localStorage.removeItem('user')
        //   localStorage.setItem('user', JSON.stringify(user));
        //   window.location.href = '/';
        // })
      } catch (err) {
        console.log('>>>>>', err)
      }
    })
  }

}
