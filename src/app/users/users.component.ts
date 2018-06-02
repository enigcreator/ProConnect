import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isLoggedIn: boolean;
  users: any;

  constructor(private usersService: UsersService,
              private router: Router,
              private authService: AuthServiceService) { 

                this.isLoggedIn = this.authService.isLoggedIn;
                

              }
  ngOnInit() {

    this.getAll();
  }

  getAll()
  {

    this.usersService.getAllUsers().subscribe(data => {

      if(data.success)
        this.users = data.result;

      else
        console.log("False");


    });
  }


  route_chat(id)
  {
    this.router.navigate(['/chat',id]);
  }

}
