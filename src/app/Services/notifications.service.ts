import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

@Injectable()
export class NotificationsService {

  constructor(private http : Http) { }



  get_notifications(id)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/thread/getNotifications?id='+id, {headers: headers})
    .map(res => res.json());
  }

}
