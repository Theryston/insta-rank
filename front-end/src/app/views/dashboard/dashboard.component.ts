import { UserService } from './../../services/user.service';
import { InstagramService } from './../../services/instagram.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

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
  showPlansButton: boolean | undefined;
  load = {
    isVisible: false,
    max: 100,
    status: 0,
    label: ''
  }

  constructor(private snackBar: MatSnackBar, private instagramService: InstagramService, private userService: UserService) {
    this.showPlansButton = false;
    this.posts = []
    this.orderBy = 'likes'
    this.username = ''
    this.profile_pic_url = 'assets/img/account.jpg'
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
    this.load.status = 0
    const posts: any = []
    try {
      const username = this.username.replace('@', '')
      if (username.length == 0) {
        this.showMessage('Insira um @ válido!')
        this.load.isVisible = false
      }
      // ${~~(Math.random() * 3333)}
      let url = `https://images3333-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${encodeURIComponent(`https://www.instagram.com/${username}`)}`;
      var myHeaders = new Headers();
      var myRequest = new Request(url, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
      });
      const res = await fetch(myRequest)
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
          this.load.status++
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
      this.load.isVisible = false
    } catch (error) {
      console.log(error)
      this.load.isVisible = false
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