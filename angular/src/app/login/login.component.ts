import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginObject } from '../request-object/login';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorDisplay: boolean;
  errorMessage: string;
  successDisplay: boolean;
  successMessage: string;
  message: string;
  isRegistered: boolean;
  loginObj: LoginObject = new LoginObject();
  constructor(private authService: AuthService, private router: Router) {
    this.message = authService.message;
    this.isRegistered = authService.isRegistered;
   }

  ngOnInit() {
    this.errorDisplay = false;
    this.successDisplay = false;
  }

  onLogin(form: NgForm) {
    this.authService.loginUser(this.loginObj)
      .subscribe(data => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/dashboard']);
          this.authService.message = 'Login Was Successful';
          this.authService.isRegistered = true;
        }
        if (!data.success) {
          this.errorDisplay = true;
          this.errorMessage = data.message;
          this.successDisplay = false;
          this.successMessage = '';
          this.fadeOut();
        }
      });
  }

  fadeOut() {
    setTimeout(() => {
      this.errorDisplay = false;
      this.successDisplay = false;
    }, 9000);
  }

}
