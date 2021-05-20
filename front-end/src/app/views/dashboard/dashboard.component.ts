import { Component, OnInit } from '@angular/core';

interface IPost {
  url: string;
  cover_url: string;
  likes: number;
  comments: number;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  instagram_token?: string;
  instagram_id?: string;
  buy?: boolean | undefined;
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderBy: string;

  constructor() { 
    this.orderBy = 'likes'
  }

  ngOnInit(): void {
    const user: any = localStorage.getItem('user')
    if (!user) {
      window.location.href = 'https://www.instagram.com/oauth/authorize?client_id=260917165732736&redirect_uri=https://4200-maroon-turkey-xsybm1cb.ws-us04.gitpod.io/auth&response_type=code&scope=user_profile,user_media'
    }
  }

  submit(): void {
    alert(this.orderBy)
  }

}
