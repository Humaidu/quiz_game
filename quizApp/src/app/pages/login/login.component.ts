import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: any;
  tokenKey: string = 'token';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  login() {
    this.loginData = this.loginForm.value;
    this.userService.login(this.loginData)
    this.loginForm.reset();
  }

}
