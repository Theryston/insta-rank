import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

interface IUser {
  name: string;
  email: string;
  password: string;
  instagram_token?: string;
  buy?: boolean | undefined;
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  user: IUser

  constructor(private userService: UserService, private router: Router, private activated: ActivatedRoute) {
    this.user = {
      name: "",
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.userService.register(this.user).subscribe((res) => {
      this.userService.showMessage("Usuário criado com sucesso!")
      localStorage.setItem('token_login', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.activated.queryParams.subscribe(queryParams => {
        if (queryParams.plan) {
          window.location.href = queryParams.plan
        } else {
          window.location.href = '/'
        }
      })
    })
  }

}
