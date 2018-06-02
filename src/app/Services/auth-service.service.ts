import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthServiceService {

  isLoggedIn: boolean;
  authToken: any;
  user: any;

  isSignupBarVisible: boolean;

  signUpBarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  logInStatusChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: Http) {
  
      

      this.authToken = JSON.parse(localStorage.getItem('authToken'));
      this.user = JSON.parse(localStorage.getItem('userData'));

      if(this.authToken == null || this.user == null )
      {
        this.isLoggedIn = false;
        this.isSignupBarVisible = true;
      }
      else
      {
        this.isLoggedIn = true;
        this.isSignupBarVisible = false;
      }

   }



   toggleIsLoggedIn()
   {
     this.isLoggedIn = !this.isLoggedIn;
     this.logInStatusChange.next(this.isLoggedIn);
   }

   toggleSingupBarVisibility()
   {
     this.isSignupBarVisible = !this.isSignupBarVisible;
     this.signUpBarVisibilityChange.next(this.isSignupBarVisible);
   }

  
  registerUser(user)
  {

    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .map(res => res.json());

  }

  authenticateUser(user)
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
    
  }

  getallEmails()
  {
    let headers = new Headers;

    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/allEmails', {headers: headers})
    .map(res => res.json());
  }
  updateTokenAndData(token, userData)
  {
    this.authToken = token;
    this.user = userData;
    localStorage.setItem('authToken', JSON.stringify(this.authToken));
    localStorage.setItem('userData', JSON.stringify(this.user));
  }

  logOut()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
