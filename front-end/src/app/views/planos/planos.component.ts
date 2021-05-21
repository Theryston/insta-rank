import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.css']
})
export class PlanosComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
      if (localStorage.getItem('token_login') === null) {
        this.userService.showMessage('Faça login ou se cadastre para saber mais sobre os planos')
        this.router.navigate(['/registrar'])
      }
  }

}
