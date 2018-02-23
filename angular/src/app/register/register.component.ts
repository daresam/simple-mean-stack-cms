import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterObject } from '../request-object/register';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerObj: RegisterObject = new RegisterObject();
  errorDisplay: boolean;
  errorMessage: string;
  successDisplay: boolean;
  successMessage: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.errorDisplay = false;
    this.successDisplay = false;
  }

  onRegister(form: NgForm) {
  this.authService.registerUser(this.registerObj)
    .subscribe(data => {
      if (data.success) {

        this.router.navigate(['/login']);
        this.authService.message = 'Your Registration Was Successful';
        this.authService.isRegistered = true;
        // this.errorDisplay = false;
        // this.errorMessage = '';
        // this.successDisplay = true;
        // this.successMessage = data.message;
        // form.reset();
        // this.fadeOut();
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
