import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://5.183.11.28:3000/api/v1'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + '/user', user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(id: number): Observable<{user: IUser}> {
    return this.http.get<{user: IUser}>(this.baseUrl + '/user/'+id, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token_login')}) }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(this.baseUrl + '/user/'+user.id, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+localStorage.getItem('token_login')}) }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  auth(user: { email: string; password: string; }): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user/auth', user).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(e.error.message);
    return EMPTY;
  }

}
