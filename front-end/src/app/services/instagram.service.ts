import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  baseUrl = 'https://3000-maroon-turkey-xsybm1cb.ws-us07.gitpod.io/api/v1'
  insta_base_url = 'https://graph.facebook.com'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  orderBy(datas: any) {
    const user: any = localStorage.getItem('user');
    return this.http.post<any>(this.baseUrl + '/order/' + JSON.parse(user).id + '?orderBy=' + datas.orderBy, { instagram: datas.instagram }, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token_login') }) }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
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
      localStorage.removeItem('instagram')
      window.location.href = '/'
    } else {
      this.showMessage(e.error.message + ' | redirecionando para a tela de pagamento');
      setTimeout(() => {
        window.location.href = 'https://sun.eduzz.com/861320'
      }, 3000)
    }
    return EMPTY;
  }

}
