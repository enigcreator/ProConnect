import { Component, OnInit } from '@angular/core';
import { ValidateServiceService } from '../services/validate-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email: String;
  password: String;
  loginButtonStatus: boolean;
  disableAll: boolean;
  isLoggedIn: boolean;
  logInSubscription: any;

  constructor(private validateService: ValidateServiceService,
    private flashMessageService: NgFlashMessageService,
    private authService: AuthServiceService) 
    {

      this.isLoggedIn = authService.isLoggedIn;
      this.toggleAllInputs();

      
      this.logInSubscription = this.authService.logInStatusChange.subscribe((value) =>
    {
      
        this.isLoggedIn = value;
        this.toggleAllInputs();
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
      this.flashMessageService.showFlashMessage({
        messages: ["Please use correct email format"], 
        dismissible: true, 
        timeout: 1000,
        type: 'danger'
      });      
      return false;
    }

    if(this.validateService.validatePassword(user.password) == false)
    {
      this.flashMessageService.showFlashMessage({
        messages: ["Password should be of 8 characters"], 
        dismissible: true, 
        timeout: 1000,
        type: 'danger'
      });     
       return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {

      if(data.success)
      {
        this.flashMessageService.showFlashMessage({
          messages: ["You are successfully logged in!"], 
          dismissible: true, 
          timeout: 1000,
          type: 'success'
        });  

      
        this.authService.updateTokenAndData(data.token, data.user);
        this.toggleDisableAllButton();
        this.authService.toggleSingupBarVisibility();

      }

      else
      {
        this.flashMessageService.showFlashMessage({
          messages: ["Unable to login, check email and password"], 
          dismissible: true, 
          timeout: 1000,
          type: 'success'
        });  
      }

    });





  }

  logOut()
  {
    this.toggleDisableAllButton();
    this.authService.logOut();
    this.authService.toggleSingupBarVisibility();
   // this.router.navigate(['/']);
  }
}
