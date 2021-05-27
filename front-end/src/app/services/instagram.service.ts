import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import axios from "axios";
import { Router } from '@angular/router';

interface IPost {
  like_count: number;
  comments_count: number;
  media_url: string;
  permalink: string;
  timestamp: Date;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  baseUrl = 'https://instarank-com-br.umbler.net/api/v1'
  insta_base_url = 'https://graph.facebook.com'

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  orderBy(datas: any): Observable<{ post: IPost[], message: string }> {
    const user: any = localStorage.getItem('user');
    if (user != null) {
      return this.http.post<{ post: IPost[], message: string }>(this.baseUrl + '/order/' + JSON.parse(user).id + '?orderBy=' + datas.orderBy, { instagram: datas.instagram }, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token_login') }) }).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
    } else {
      return this.http.post<{ post: IPost[], message: string }>(this.baseUrl + '/order/-1?orderBy=' + datas.orderBy, { instagram: datas.instagram }, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token_login') }) }).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      )
    }
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  errorHandler(e: any): Observable<any> {
    if (e.error.message != 'Faça o pagamento para usar a ferramenta') {
      // localStorage.clear()
      // window.location.href = '/'
    } else {
      this.showMessage(e.error.message);
      this.router.navigate(['/planos'])
    }
    return EMPTY;
  }

}
