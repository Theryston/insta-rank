import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home-mobile.component.css']
})
export class HomeComponent implements OnInit {
  email: string;

  constructor(private router: Router, private userService: UserService) {
    this.email = '';
    // window.location.href = 'https://instarank.prsacademy.com.br';
  }

  ngOnInit(): void { }

  submit(): void {
    this.userService.leads(this.email).subscribe((data) => {
      this.userService.showMessage(data.message)
      this.router.navigate(['/dashboard'])
    })
  }

}
