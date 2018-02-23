import { Injectable } from '@angular/core';
import { ApiHeaderService } from './api-header.service';
import { HttpClient } from '@angular/common/http';
import { RegisterResponse } from '../response-object/register';
import { map, retry } from 'rxjs/operators';
import { RegisterObject } from '../request-object/register';
import { LoginObject } from '../request-object/login';
import { LoginResponse } from '../response-object/login';
import { LoadUsersResponse } from '../response-object/load-users-response';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  message: string;
  isRegistered: boolean;
  constructor(private apiHeader: ApiHeaderService, private http: HttpClient) { }

  registerUser(data: RegisterObject) {
    const url = this.apiHeader.url + 'users/register';
    return this.http.post<RegisterResponse>(url, data, {headers: this.apiHeader.headers})
    .pipe(
      map( response => response ),
      retry(3)
    );
  }

  loginUser(data: LoginObject) {
    const url = this.apiHeader.url + 'users/authenticate';
    return this.http.post<LoginResponse>(url, data, {headers: this.apiHeader.headers})
    .pipe(
      map( response => response ),
      retry(3)
    );
  }

  getUsers() {
    const url = this.apiHeader.url + 'users';
    return this.http.get<LoadUsersResponse>(url, {headers: this.apiHeader.headers})
    .pipe(
      map( response => response ),
      retry(3)
    );
  }

  isLoggedIn() {
    // return tokenNotExpired('id_token');
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return false;
  }

  isAdmin() {
    const isAdmin = JSON.parse(localStorage.getItem('user'));
    if (isAdmin) {
      return isAdmin.isAdmin;
    }
  }
  getUsername() {
    let username = JSON.parse(localStorage.getItem('user'));
    if (username) {
      return  username.username;
    }
    if (username == null) {
      return username = '';
    }

  }

  logout() {
    window.location.reload();
    localStorage.clear();
  }
}
