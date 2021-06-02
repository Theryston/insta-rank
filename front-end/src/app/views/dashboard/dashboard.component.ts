import { UserService } from './../../services/user.service';
import { InstagramService } from './../../services/instagram.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

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
  filter = {
    justType: 'all',
    initDate: '',
    endDate: ''
  }
  orderBy: string;
  username: string;
  profile_pic_url: string;
  posts: any[]
  postsRaw: any[]
  showPlansButton: boolean | undefined;
  load = {
    isVisible: false,
    max: 100,
    status: 0,
    label: ''
  }
  options_default = {
    username: "@ptkdev",
    "items-limit": "9",
    "image-width": "100%",
    "image-height": "100%",
    grid: "responsive",
    cache: "enabled",
    "border-spacing": "2px",
    "border-corners": "5",
    "force-square": "yes",
    shadows: "disabled",
    "mouse-hover": "disabled",
    "show-title": "enabled",
  };
  options: any;


  constructor(private snackBar: MatSnackBar, private instagramService: InstagramService, private userService: UserService, private router: Router) {
    this.options = Object.create(this.options_default);
    this.showPlansButton = false;
    this.posts = []
    this.postsRaw = []
    this.orderBy = 'likes'
    this.username = ''
    this.profile_pic_url = 'assets/img/account.jpg'
    if (window.localStorage.getItem('supported') == null) {
      this.router.navigate(['/compativel'])
    }
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
    this.postsRaw = []
    this.load.status = 0
    const posts: any = []
    try {
      const username = this.username.replace('@', '')
      if (username.length == 0) {
        this.showMessage('Insira um @ válido!')
        this.load.isVisible = false
      }
      // ${~~(Math.random() * 3333)}
      let gotUserDatas = false
      var res: any = ''
      for (let num = 0; !gotUserDatas && num != 100; num++) {
        this.load.isVisible = true
        this.load.status = num
        this.load.max = 100
        this.load.label = 'Procurando perfil...'
        try {
          let url = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${encodeURI(`https://www.instagram.com/${username}`)}`;
          res = await window.fetch(url, {
            method: "GET", mode: "cors", redirect: "follow", cache: this.options["cache"] === null || this.options["cache"] === "enabled" ? "force-cache" : "default",
          })
          if (res.status == 200) {
            gotUserDatas = true
          }
        } catch (error) {
          console.log('error', error)
          if (num == 99) {
            this.load.isVisible = false
            this.load.status = 0
            this.load.max = 0
          }
          gotUserDatas = false
        }
      }
      this.load.isVisible = false
      this.load.status = 0
      this.load.max = 0
      if (res.status > 399 && res.status < 501) {
        this.showMessage('Houve um  erro! Confira o @ que você digitou e tente novamente!')
        this.load.isVisible = false
      }
      const resText: any = await res.text();
      const regExp: any = resText.match(new RegExp(/<script type="text\/javascript">window\._sharedData = (.*);<\/script>/))[1]
      var userDatas = JSON.parse(regExp).entry_data.ProfilePage[0];
      this.load.max = userDatas.graphql.user.edge_owner_to_timeline_media.count
      this.load.label = "Buscando posts..."
      this.load.status = 0
      this.load.isVisible = true
      this.profile_pic_url = `https://api.allorigins.win/raw?url=${encodeURIComponent(userDatas.graphql.user.profile_pic_url_hd)}`
      userDatas.graphql.user.edge_owner_to_timeline_media.edges.forEach((post: any) => {
        this.load.status++
        post.url = `https://www.instagram.com/p/${post.node.shortcode}/`
        post.node.thumbnail_src = `https://api.allorigins.win/raw?url=${encodeURIComponent(post.node.thumbnail_src)}`
        this.postsRaw.push(post)
      })
      const userId = userDatas.graphql.user.id
      let endCursor = userDatas.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      let hasNextPage = userDatas.graphql.user.edge_owner_to_timeline_media.page_info.has_next_page
      while (hasNextPage) {
        let postsUrl = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${encodeURIComponent(`https://www.instagram.com/graphql/query/?query_hash=02e14f6a7812a876f7d133c9555b1151&variables={"id":"${userId}","first":50,"after":"${endCursor}"`)}}`;
        const postsRes = await window.fetch(postsUrl, {
          method: "GET", mode: "cors", redirect: "follow", cache: this.options["cache"] === null || this.options["cache"] === "enabled" ? "force-cache" : "default",
        })
        const postsDatas = await postsRes.json()
        postsDatas.data.user.edge_owner_to_timeline_media.edges.forEach((post: any) => {
          this.load.status++
          post.url = `https://www.instagram.com/p/${post.node.shortcode}/`
          post.node.thumbnail_src = `https://api.allorigins.win/raw?url=${encodeURIComponent(post.node.thumbnail_src)}`
          this.postsRaw.push(post)
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
      this.order()
      this.load.isVisible = false
    } catch (error) {
      console.log(error)
      this.load.isVisible = false
      this.showMessage('Houve um erro inesperado! tente novamente daqui a 5 minutos')
    }
  }

  order(): void {
    this.load.isVisible = true
    this.load.max = 10
    this.load.status = 0
    this.load.label = 'Ordenando...'
    var datas = {
      posts: this.postsRaw,
      buy: true
    }
    this.showPlansButton = true
    const user: any = window.localStorage.getItem('user')
    if (user != null) {
      const userLocal = JSON.parse(user)
      this.userService.read(userLocal.id).subscribe((userLocalDatas: { user: IUser }) => {
        if (userLocalDatas.user.buy !== undefined) {
          datas.buy = userLocalDatas.user.buy
          this.showPlansButton = !userLocalDatas.user.buy

          if (this.filter.justType == 'images') {
            datas.posts = datas.posts.filter((post: any) => post.node.__typename == 'GraphImage')
          } else if (this.filter.justType == 'circle') {
            datas.posts = datas.posts.filter((post: any) => post.node.__typename == 'GraphSidecar')
          } else if (this.filter.justType == 'videos') {
            datas.posts = datas.posts.filter((post: any) => {
              if (post.node.__typename == "GraphVideo" && post.node.product_type == 'feed') {
                return true
              } else {
                return false
              }
            })
          } else if (this.filter.justType == 'reels') {
            datas.posts = datas.posts.filter((post: any) => {
              if (post.node.__typename == "GraphVideo" && post.node.product_type != 'feed') {
                return true
              } else {
                return false
              }
            })
          } else if (this.filter.justType == 'all') {
            datas.posts = datas.posts
          }

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

          this.load.isVisible = false
        }
      })
    } else {
      if (this.filter.justType == 'images') {
        datas.posts = datas.posts.filter((post: any) => post.node.__typename == 'GraphImage')
      } else if (this.filter.justType == 'circle') {
        datas.posts = datas.posts.filter((post: any) => post.node.__typename == 'GraphSidecar')
      } else if (this.filter.justType == 'videos') {
        datas.posts = datas.posts.filter((post: any) => {
          if (post.node.__typename == "GraphVideo" && post.node.product_type == 'feed') {
            return true
          } else {
            return false
          }
        })
      } else if (this.filter.justType == 'reels') {
        datas.posts = datas.posts.filter((post: any) => {
          if (post.node.__typename == "GraphVideo" && post.node.product_type != 'feed') {
            return true
          } else {
            return false
          }
        })
      } else if (this.filter.justType == 'all') {
        datas.posts = datas.posts
      }

      if (this.orderBy == 'likes') {
        datas.posts = datas.posts.sort((a: any, b: any) => {
          return b.node.edge_media_preview_like.count - a.node.edge_media_preview_like.count
        })
      } else if (this.orderBy == 'comments') {
        datas.posts = datas.posts.sort((a: any, b: any) => {
          return b.node.edge_media_to_comment.count - a.node.edge_media_to_comment.count
        })
      }

      this.posts = datas.posts.slice(0, 6)

      this.load.isVisible = false
    }
  }

  // showPosts(posts: any, buy: boolean | undefined) {
  //   this.posts = posts
  // }
}

// function I() {
//   let a = ""
//     , e = (t = Math.ceil(i.medias.length / 12),
//   i.medias.slice(12 * (l - 1), 12 * l));
//   var s = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
//   let o = 1;
//   e.forEach(t=>{
//       if (d || 1 == l && o <= 3) {
//           let e = new Date(1e3 * t.date);
//           var n = e.getDate() + " DE " + s[e.getMonth()] + " DE " + e.getFullYear();
//           a += '<a href="https://www.instagram.com/p/' + t.shortcode + '" target="_blank" class="item"><img src="https://api.allorigins.win/raw?url=' + encodeURIComponent(t.thumbnail) + '"><span class="flex items-center"><span class="mr-3 flex items-center"><svg class="icon"><use xlink:href="#like"></use></svg> ' + t.likes.toLocaleString() + '</span><span class="flex items-center"><svg class="icon"><use xlink:href="#comment"></use></svg> ' + t.comments.toLocaleString() + '</span></span><span class="date">' + n + '</span><span class="type ' + t.type + '"></span><span class="overlay"></span></a>'
//       } else
//           a += '<div class="item showmodal"><img src="/empty.png"><span class="nolicense">ADQUIRA UMA LICENÇA PARA VER TUDO</span><span class="overlay"></span></div>';
//       o++
//   }
//   ),
//   g.innerHTML = a
// }