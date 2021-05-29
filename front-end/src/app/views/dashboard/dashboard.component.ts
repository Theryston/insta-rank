import { UserService } from './../../services/user.service';
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
  posts: any[]
  showPlansButton: boolean | undefined;
  load = false

  constructor(private snackBar: MatSnackBar, private instagramService: InstagramService, private userService: UserService) {
    this.showPlansButton = false;
    this.posts = []
    this.orderBy = 'date'
    this.username = ''
    this.profile_pic_url = 'assets/img/account.png'
  }

  ngOnInit(): void { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  async submit() {
    const posts: any = []
    try {
      this.load = true
      const username = this.username
      if (username.length == 0) {
        this.showMessage('Insira um @ válido!')
        this.load = false
      }
      let url = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${encodeURI(`https://www.instagram.com/${username}?__a=1?`)}`;
      const res = await window.fetch(url);
      if (res.status > 399 && res.status < 501) {
        this.showMessage('Houve um  erro! Confira o @ que você digitou e tente novamente!')
        this.load = false
      }
      const resText: any = await res.text();
      const regExp: any = resText.match(new RegExp(/<script type="text\/javascript">window\._sharedData = (.*);<\/script>/))[1]
      var userDatas = JSON.parse(regExp).entry_data.ProfilePage[0];
      this.profile_pic_url = `https://api.allorigins.win/raw?url=${encodeURIComponent(userDatas.graphql.user.profile_pic_url_hd)}`
      userDatas.graphql.user.edge_owner_to_timeline_media.edges.forEach((post: any) => {
        post.url = `https://www.instagram.com/p/${post.node.shortcode}/`
        post.node.thumbnail_src = `https://api.allorigins.win/raw?url=${encodeURIComponent(post.node.thumbnail_src)}`
        posts.push(post)
      })
      const userId = userDatas.graphql.user.id
      let endCursor = userDatas.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      let hasNextPage = userDatas.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page
      while (hasNextPage) {
        let postsUrl = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${encodeURIComponent(`https://www.instagram.com/graphql/query/?query_hash=02e14f6a7812a876f7d133c9555b1151&variables={"id":"${userId}","first":50,"after":"${endCursor}"`)}}`;
        const postsRes = await window.fetch(postsUrl);
        const postsDatas = await postsRes.json()
        postsDatas.data.user.edge_owner_to_timeline_media.edges.forEach((post: any) => {
          post.url = `https://www.instagram.com/p/${post.node.shortcode}/`
          post.node.thumbnail_src = `https://api.allorigins.win/raw?url=${encodeURIComponent(post.node.thumbnail_src)}`
          posts.push(post)
        });
        endCursor = postsDatas.data.user.edge_owner_to_timeline_media.page_info.end_cursor
        hasNextPage = postsDatas.data.user.edge_owner_to_timeline_media.page_info.has_next_page
      }
      const datas = {
        orderby: this.orderBy,
        posts
      }
      const tokenLogin: any = window.localStorage.getItem('token_login')
      const user_local: any = window.localStorage.getItem('user')
      if (tokenLogin != null) {
        this.showPlansButton = false
        const userLocal = JSON.parse(user_local)
        this.userService.read(userLocal.id).subscribe((userLocalDatas: { user: IUser }) => {
          this.order({ buy: userLocalDatas.user.buy, posts })
        })
      } else {
        this.showPlansButton = true
        this.order({ buy: false, posts })
      }
      this.load = false
    } catch (error) {
      console.log(error)
      this.load = false
      this.showMessage('Houve um erro inesperado! tente novamente')
    }
  }

  order(datas: { buy: boolean | undefined; posts: any[] }): void {
    if (this.orderBy == 'likes') {
      datas.posts = datas.posts.sort((a: any, b: any) => {
        return b.node.edge_media_preview_like.count - a.node.edge_media_preview_like.count
      })
    } else if (this.orderBy == 'comments') {
      datas.posts = datas.posts.sort((a: any, b: any) => {
        return b.node.edge_media_to_comment.count - a.node.edge_media_to_comment.count
      })
    }

    if (!datas.buy) {
      this.posts = datas.posts.slice(0, 6)
    } else {
      this.posts = datas.posts
    }
  }
}
