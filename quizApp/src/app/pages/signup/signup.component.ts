import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  userData!: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  signUpForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}

  signUp() {
    this.userData = this.signUpForm.value
    this.userService.signUp(this.userData).subscribe(
      (response: any) => {
        this.router.navigate(['login']);
        alert('Sign Up Successfull');
      },
      (err) => {
        console.log(err);
        alert('something went wrong')
      }
    );
    this.signUpForm.reset();
    
  }
}
