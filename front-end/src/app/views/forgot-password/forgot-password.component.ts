import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.userService.forgotPassword(this.email).subscribe(res => {
      this.userService.showMessage(res.message)
      window.localStorage.clear()
    })
  }

}
