import { Component, OnInit } from '@angular/core';
import { ValidateServiceService } from '../services/validate-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  path:any;
  path2: any;
  email: String;
  password: String;
  loginButtonStatus: boolean;
  disableAll: boolean;          //deprecated
  isLoggedIn: boolean;
  logInSubscription: any;
  currentRoute: any;

  constructor(private validateService: ValidateServiceService,
    private flashMessageService: NgFlashMessageService,
    private authService: AuthServiceService,
    private router: Router) 
    {

      this.path = require( "../../img/favicon.png");
    
      
        
      router.events.subscribe((url:any) => this.currentRoute = this.router.url);
      this.isLoggedIn = authService.isLoggedIn;
      this.toggleAllInputs();


      if(this.isLoggedIn == true)
        if(this.authService.user.img != null || this.authService.user.img != "")
          this.path2 = this.authService.user.img;
        else
          this.path2 = false;
      else
          this.path2 = false;
      



      this.logInSubscription = this.authService.logInStatusChange.subscribe((value) =>{

        this.isLoggedIn = value;

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


  logOut()
  {
    this.toggleDisableAllButton();
    this.authService.logOut();
    this.authService.toggleSingupBarVisibility();
   // this.router.navigate(['/']);
  }
}
