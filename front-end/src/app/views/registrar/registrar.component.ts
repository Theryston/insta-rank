import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {
    this.user = {
      name: "",
      email: "",
      password: ""
    }
   }

  ngOnInit(): void {
  }

  submit(): void {
    this.userService.register(this.user).subscribe(() => {
      this.userService.showMessage("Usuário criado com sucesso!")
      this.router.navigate(['/conectar'])
    })
  }

}
