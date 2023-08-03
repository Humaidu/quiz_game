import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string = '';

  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.userService.isLoggedIn().subscribe((res) => {
      this.isLoggedIn = res;
    });
   this.email = this.userService.getEmail();
   console.log(this.email);
   
  }
}
