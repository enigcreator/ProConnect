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

  getTag(id)
  {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/helper/getTag?id='+id+'', {headers: headers})
    .map(res => res.json());
  }

  get_chat(from, to)
  {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/helper/getAllChat?to='+to+'&from='+from+'', {headers: headers})
    .map(res => res.json());
  }

  
}
