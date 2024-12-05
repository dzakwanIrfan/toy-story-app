/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: any;
  password: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.username != null && this.password != null) {
      const data = {
        username: this.username,
        password: this.password
      }
      this.api.register(data, 'register.php').subscribe({
        next: (res) => {
          this.username = '';
          this.password = '';
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }

}
