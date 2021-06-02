import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-compatible',
  templateUrl: './compatible.component.html',
  styleUrls: ['./compatible.component.css']
})
export class CompatibleComponent implements OnInit {
  text = '';
  button = false;
  errors = 0;
  load = {
    isVisible: false,
    max: 10,
    status: 0,
    label: 'Testando...'
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

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private userService: UserService) {
    if (window.localStorage.getItem('supported') != null) {
      this.router.navigate(['/dashboard'])
    }
    this.options = Object.create(this.options_default);
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(queryParams => {
      if (window.localStorage.getItem('supported') == null) {
        if (!queryParams.status) {
          this.text = ''
          this.button = true;
        } else {
          this.load.status = Number(queryParams.status)
          this.errors = Number(queryParams.errors)
          if (this.load.status <= this.load.max) {
            this.test()
          } else {
            const success = this.load.max - this.errors
            if (success < this.load.max / 2) {
              window.fetch('https://instarank-com-br.umbler.net/api/v1/devices?status=2', {
                method: 'POST'
              })
              this.userService.showMessage(`Por favo, tente novamente daqui a 5 minutos`)
              setTimeout(() => {
                window.location.href = '/compativel'
              }, 1000)
            } else {
              window.fetch('https://instarank-com-br.umbler.net/api/v1/devices?status=1', {
                method: 'POST'
              })
              window.localStorage.setItem('supported', "true")
              this.userService.showMessage(`Seu dispositivo é compatível com o sistema!`)
              this.router.navigate(['/dashboard'])
            }
          }
        }
      } else {
        this.router.navigate(['/dashboard'])
      }
    })
  }

  start(): void {
    this.test()
  }

  async test() {
    this.load.isVisible = true;
    try {
      let url = `https://images${~~(Math.random() * 3333)}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${encodeURI(`https://www.instagram.com/instagram`)}`;
      await window.fetch(url, {
        method: "GET", mode: "cors", redirect: "follow", cache: this.options["cache"] === null || this.options["cache"] === "enabled" ? "force-cache" : "default",
      })
      this.load.status++
    } catch (err) {
      this.load.status++
      this.errors++
    }
    window.location.href = `/compativel?errors=${this.errors}&status=${this.load.status}`
  }

}
