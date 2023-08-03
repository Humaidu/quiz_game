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
    // this.userService.login().subscribe(
    //   (res) => {
    //     console.log(res);
    //     const user = res.find((a: any) => {
    //       return (
    //         a.email === this.loginData.email &&
    //         a.password === this.loginData.password
    //       );
    //     });
    //     if (user) {
    //       localStorage.setItem(this.tokenKey, user);
    //       this.router.navigate(['/dashboard']);
    //       alert('Login successful');
    //     } else {
    //       localStorage.setItem(this.tokenKey, user)
    //       alert('User Not Found');
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     alert('Something went wrong');
    //   }
    // );
    this.loginForm.reset();
  }

}
