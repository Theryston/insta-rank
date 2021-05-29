import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.id) {
        if (event.url == '/dashboard') {
          localStorage.setItem('inDashboard', 'true');
        } else {
          localStorage.setItem('inDashboard', 'false');
        }
      }
    })
    const user: any = localStorage.getItem('user')
    // if (window.location.pathname == '/dashboard' && localStorage.getItem('token_login') == null) {
    //   window.location.href = '/'
    // } else 
    if (localStorage.getItem('token_login') != null && window.location.pathname != '/dashboard') {
      this.router.navigate(['/dashboard'])
    }

    // this.userService.read(JSON.parse(user).id).subscribe(data => {
    //   // if (!data.user.buy) {
    //   //   this.router.navigate(['/planos'])
    //   // }
    // })
  }
}
