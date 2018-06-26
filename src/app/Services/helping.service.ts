import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';

@Injectable()
export class HelpingService {


  locations: any;

  constructor(private http: Http) { }

  getAllLocations()
  {

    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/helper/locations', {headers: headers})
    .map(res => res.json());

  }


  

  
}
