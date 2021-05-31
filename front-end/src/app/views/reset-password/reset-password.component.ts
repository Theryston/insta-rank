import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password = ''
  password2 = ''

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.password == this.password2) {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        const token = queryParams.token
        if (token) {
          this.userService.resetPassword(this.password, token).subscribe(res => {
            this.userService.showMessage(res.message)
            this.router.navigate(['/conectar'])
          })
        } else {
          this.userService.showMessage('Essa tentativa de redefinição de senha é inválida. click no link enviado para seu e-mail!')
        }
      })
    } else {
      this.userService.showMessage('As duas senhas não são iguais')
    }
  }

}
