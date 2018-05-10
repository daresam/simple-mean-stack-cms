import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiHeaderService {

  public url: string;
  public headers: any;
  constructor() {
    this.url = 'http://localhost:3000/';
    // this.url = '';
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }

}
