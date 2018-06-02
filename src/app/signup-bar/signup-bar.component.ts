import { Component, OnInit } from '@angular/core';
import { ValidateServiceService } from '../services/validate-service.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthServiceService } from '../services/auth-service.service';
import { HelpingService } from '../services/helping.service';
import { ThreadsService } from '../services/threads.service';
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
  email: String;
  password: String;
  location: String;
  allEmails: any;
  locationsData: any;
  emailFlag: boolean;

  constructor(private validateService: ValidateServiceService,
              private flashMessageService: NgFlashMessageService,
              private authService: AuthServiceService,
              private helpingService: HelpingService,
              private threadservice : ThreadsService) 
  { 


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

  tempF()
  {
    this.threadservice.getUser(1).subscribe(data =>
  {
    this.temp = data.user;
  });
  }
  ngOnInit() {
  }

  onRegisterSubmit()
  {
    const user = {
      display_name: this.display_name,
      email: this.email,
      password: this.password,
      location: this.location
    };

    if(this.validateService.validateRegister(user) == false)
    {
      this.flashMessageService.showFlashMessage({
        messages: ["Please input all fields"], 
        dismissible: true, 
        timeout: 1000,
        type: 'danger'
      });
      return false;
    }


    if(this.validateService.validateDisplayName(user.display_name) == false)
    {
      this.flashMessageService.showFlashMessage({
        messages: ["Display name requires atleast 3 consecutive alphabets and can not end in an underscore"], 
        dismissible: true, 
        timeout: 1000,
        type: 'danger'
      });      
      return false;
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
              this.flashMessageService.showFlashMessage({
                messages: ["An Email with thhis name already exists!"], 
                dismissible: true, 
                timeout: 4000,
                type: 'danger'
              }); 
            }
          }

          if(this.emailFlag == false)
          {
              this.authService.registerUser(user).subscribe(data => {
                if(data.success)
                {
                  this.flashMessageService.showFlashMessage({
                    messages: ["You are successfully registered and now may log in!"], 
                    dismissible: true, 
                    timeout: 4000,
                    type: 'success'
                  });     
                }
                else
                {
    
                  this.flashMessageService.showFlashMessage({
                    messages: [data.error], 
                    dismissible: true, 
                    timeout: 4000,
                    type: 'danger'
                  });  
    
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
