import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';


@Injectable()
export class UsersService {

  constructor(private http: Http) { }


  getAllUsers()
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getAllUsers', {headers: headers})
    .map(res => res.json());
  }

}


