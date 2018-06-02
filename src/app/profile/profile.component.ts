import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  constructor(private authService: AuthServiceService,
              private userService: UsersService) {

      
    
    
    
   }

  ngOnInit() {
    this.user = this.authService.user;
  
  }

}
