import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from '../models/register';
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  tokenKey: string = 'token';
  constructor(private http: HttpClient, private router: Router) {}
  apiUrl: string = 'http://localhost:3000/signupUsers';

  signUp(signUpForm: Register): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, signUpForm, httpOptions);
  }

  login(loginData: Login) {
    this.http.get<any>(this.apiUrl).subscribe(
      (res) => {
        console.log(res);
        const user = res.find((a: any) => {
          return (
            a.email === loginData.email && a.password === loginData.password
          );
        });
        if (user) {
          console.log(user);
          localStorage.setItem(this.tokenKey, JSON.stringify(user));
          this.loggedIn.next(true);
          this.isLoggedInGuard = true;
          this.router.navigate(['/dashboard']);
          alert('Login successful');
        } else {
          alert('User Not Found');
        }
      },
      (err) => {
        console.log(err);
        alert('Something went wrong');
      }
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.isLoggedInGuard = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  getEmail(): string {
    return JSON.parse(localStorage.getItem(this.tokenKey)!).email;
  }

  getFullName(): string {
    return JSON.parse(localStorage.getItem(this.tokenKey)!).fullname;
  }
}
