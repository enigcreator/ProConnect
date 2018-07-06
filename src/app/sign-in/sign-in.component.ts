import { Component, OnInit } from '@angular/core';
import { ValidateServiceService } from '../services/validate-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: String;
  password: String;
  loginButtonStatus: boolean;
  disableAll: boolean;          //deprecated
  isLoggedIn: boolean;
  logInSubscription: any;
  currentRoute: any;
  success: boolean = false;
  warning: boolean = false;
  success_message: String;
  warning_message: String;

  constructor(private validateService: ValidateServiceService,
    private flashMessageService: NgFlashMessageService,
    private authService: AuthServiceService,
    private router: Router)  { 

      this.isLoggedIn = this.authService.isLoggedIn;

      this.logInSubscription = this.authService.logInStatusChange.subscribe((value) =>{

        this.isLoggedIn = value;
        console.log("value: "+this.isLoggedIn);
      });



    }

  ngOnInit() {
  }


  toggleAllInputs()
  {
    if(this.isLoggedIn)
      {
        this.disableAll = true;
        this.loginButtonStatus = false;
      }

      else
      {

        this.disableAll = false;
        this.loginButtonStatus = true;

      }

  }

  toggleLoginButton()
  {
    this.loginButtonStatus = !this.loginButtonStatus;
  }

  toggleDisableAllButton()
  {
    this.disableAll = !this.disableAll;
  }

  onLoginSubmit()
  {

    const user = {
      email: this.email,
      password: this.password
    }

    if(this.validateService.validateEmail(user.email) == false)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "Wrong email format!";     
      return false;
    }

    if(this.validateService.validatePassword(user.password) == false)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "Wrong password format!";     
       return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {

      if(data.success)
      {
        this.warning = false;
        this.success = true;
        this.success_message = "You are logged in! redirecting...."  ;

       // this.router.navigate(['/']);
        this.authService.updateTokenAndData(data.token, data.user);
        this.authService.toggleIsLoggedIn();
        this.toggleDisableAllButton();
        this.authService.toggleSingupBarVisibility();

      }

      else
      {
        this.warning = true;
        this.success = false;
         this.warning_message = "Wrong combination, try again";  
         //inject flash page here
      }

    });





  }

  logOut()
  {
    this.warning = false;
    this.success = false;
    this.toggleDisableAllButton();
    this.authService.logOut();
    this.authService.toggleSingupBarVisibility();
   // this.router.navigate(['/']);
  }
}



