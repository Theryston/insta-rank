import { InstagramService } from './../../services/instagram.service';
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

  constructor(private snackBar: MatSnackBar, private instagramService: InstagramService) {
    this.username = ''
    this.orderBy = 'likes'
    this.profile_pic_url = 'assets/img/logo.png'
    const instagram: any = localStorage.getItem('instagram')
    axios.get('https://graph.facebook.com/v3.2/' + JSON.parse(instagram).userID + '?fields=profile_picture_url,username&access_token=' + JSON.parse(instagram).accessToken).then(async (user: any) => {
      user = user.data
      this.username = '@' + user.username
      this.profile_pic_url = user.profile_picture_url
      this.submit()
    })
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
      const instagram: any = localStorage.getItem('instagram')
      this.instagramService.orderBy({
        instagram: JSON.parse(instagram),
        orderBy: this.orderBy
      }).subscribe(async (res) => {
        console.log(res)
      })
    }
  }

}
