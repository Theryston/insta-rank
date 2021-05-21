import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import axios from 'axios'

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
  username: string;
  profile_pic_url: string;

  constructor(private snackBar: MatSnackBar) { 
    this.orderBy = 'likes'
    this.username = ''
    this.profile_pic_url = 'assets/img/logo.png'
  }

  ngOnInit(): void {
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  submit(): void {
    if (this.username == '') {
      this.showMessage('Insira um usuário do instagram')
    } else {
      
    }
  }

}
