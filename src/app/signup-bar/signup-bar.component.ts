import { Component, OnInit } from '@angular/core';
import { ValidateServiceService } from '../services/validate-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthServiceService } from '../services/auth-service.service';
import { HelpingService } from '../services/helping.service';
import { ThreadsService } from '../services/threads.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup-bar',
  templateUrl: './signup-bar.component.html',
  styleUrls: ['./signup-bar.component.css']
})
export class SignupBarComponent implements OnInit {


  visibility: boolean;
  visibilitySubscription: any;
  temp:any;
  display_name: String;
  last_name: String;
  email: String;
  password: String;
  re_password: String;
  location: String;
  allEmails: any;
  locationsData: any;
  emailFlag: boolean;
  success: boolean = false;
  warning: boolean = false;
  success_message: String;
  warning_message: String;
  logInSubscription : any;
  isLoggedIn: boolean;

  constructor(private validateService: ValidateServiceService,
              private flashMessageService: NgFlashMessageService,
              private authService: AuthServiceService,
              private helpingService: HelpingService,
              private threadservice : ThreadsService) 
  { 

    this.isLoggedIn = this.authService.isLoggedIn;
    this.logInSubscription = this.authService.logInStatusChange.subscribe((value) =>{

      this.isLoggedIn = value;

    });



      this.visibility = authService.isSignupBarVisible;


      this.visibilitySubscription = authService.signUpBarVisibilityChange.subscribe((value =>
      {

        this.visibility = value;

      }));

      this.getAllLocations();
      

  
  }

  getAllEmails()
  {
    this.authService.getallEmails().subscribe(data => {

      if(data.success)
       this.allEmails = data.result;
      else
       console.log("false");
    })
  }


  ngOnInit() {
  }

  onRegisterSubmit()
  {
    const user = {
      display_name: this.display_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      re_password: this.re_password,
      location: this.location
    };

    if(this.validateService.validateRegister(user) == false)
    {

      this.warning = true;
      this.success = false;
      this.warning_message = "Please input all fields";
      return false;
    }


    if(this.validateService.validateDisplayName(user.display_name) == false)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "First name format incorrect!"   ;   
      return false;
    }

    if(this.validateService.validateDisplayName(user.last_name) == false)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "Last name format incorrect!"  ;
      return false;
    }

    if(this.validateService.validateEmail(user.email) == false)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "Email format incorrect!";   
      return false;
    }

    if(this.validateService.validatePassword(user.password) == false)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "Password has to be of atleast 8 characters"  ;
       return false;
    }

    if(this.password != this.re_password)
    {
      this.warning = true;
      this.success = false;
      this.warning_message = "Passwords do not match!" ;     
       return false;
    }

    // REMINDER: move this to validate service 

      this.authService.getallEmails().subscribe(data => {

        if(data.success)
        {
          this.allEmails = data.result;

          for(let i = 0; i<this.allEmails.length;i++)
          {
            if (this.email == this.allEmails[i].email)
            {
              this.emailFlag = true;
              this.warning = true;
              this.success = false;
              this.warning_message = "This email already exists!" 
            }
          }

          if(this.emailFlag == false)
          {
              this.authService.registerUser(user).subscribe(data => {
                if(data.success)
                {
                  this.success = true;
                  this.warning = false;
                  this.success_message = "Account created, you may now log in!";    
                }
                else
                {
    
                  this.warning = true;
                  this.warning_message = "An unknown error occured, please see Server Log :(" ;
                  //inject flash page here
                }
    
              });

            }
            else 
              this.emailFlag = false;
          }
        });
    
      }


  getAllLocations()
  {
  
    this.helpingService.getAllLocations().subscribe(data => {

      if(data.success)
      {
        this.locationsData = data.data;
      }

    });
  }

}
