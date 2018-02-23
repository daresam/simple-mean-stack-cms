import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username = '';
  constructor(public authService: AuthService, private router: Router) {
    console.log(authService.getUsername());
    console.log(authService.isLoggedIn());

  }

  ngOnInit() {


  }

  onLogout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }

}
