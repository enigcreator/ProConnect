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

  setImg(data)
  {
    
     let path = JSON.parse(data.path).path;
     let headers = new Headers;
      console.log("data to be sent" + data);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/setImg?path='+path+'&id='+data.id, {headers: headers})
    .map(res => res.json());
  }

  getImg(data)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getImg?id='+data.id, {headers: headers})
    .map(res => res.json());
  }


  getName(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/name?id='+id, {headers: headers})
    .map(res => res.json());
  }

}


