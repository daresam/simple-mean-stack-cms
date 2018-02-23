import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../response-object/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message: string;
  isRegistered: boolean;
  users: User[] = [];
  constructor(private authService: AuthService) {
    this.message = authService.message;
    this.isRegistered = authService.isRegistered;
  }

  ngOnInit() {
    this.fadeOut();
    this.onGetUser();
  }

  fadeOut() {
    setTimeout(() => {
      this.authService.isRegistered = false;
    }, 5000);
  }

  onGetUser() {
    this.authService.getUsers()
      .subscribe(data => {
        if (data.success) {
          this.users = data.user;
        }
    });

  }
}
