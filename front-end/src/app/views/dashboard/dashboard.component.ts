import { InstagramService } from './../../services/instagram.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import axios from 'axios'

interface IPost {
  like_count: number;
  comments_count: number;
  media_url: string;
  permalink: string;
  timestamp: Date;
  id: string;
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
  posts: IPost[];

  constructor(private snackBar: MatSnackBar, private instagramService: InstagramService) {
    this.posts = [{
      like_count: 999,
      comments_count: 999,
      media_url: 'assets/img/logo.png',
      permalink: 'http://instagram.com',
      timestamp: new Date(),
      id: '9828'
    }];
    this.username = ''
    this.orderBy = 'likes'
    this.profile_pic_url = 'assets/img/logo.png'
    setTimeout(() => {
      this.submit()
    }, 5000)
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
    var instagram: any = localStorage.getItem('instagram')
    var instagramJson = JSON.parse(instagram)
    this.showMessage('Só um momento!')

    axios.get('https://graph.facebook.com/v10.0/' + instagramJson.userID + '?fields=profile_picture_url,username&access_token=' + instagramJson.accessToken).then(async (user: any) => {
      user = user.data
      this.username = '@' + user.username
      this.profile_pic_url = user.profile_picture_url

      if (this.username == '') {
        this.showMessage('Insira um usuário do instagram')
      } else {
        this.instagramService.orderBy({
          instagram: JSON.parse(instagram),
          orderBy: this.orderBy
        }).subscribe(async (res) => {
          this.posts = res
        })
      }
    })
  }

}
