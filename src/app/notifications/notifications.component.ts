import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;
  user_id: number;

  constructor(private notificationsService: NotificationsService,
              private authservice: AuthServiceService,
              private router: Router) { }

  ngOnInit() {

         this.get_notifications();
  }


  get_notifications()
  {

    this.notificationsService.get_notifications(this.authservice.user.id).subscribe(data => {

      if(data.success)
      {
        this.notifications = data.result;
        console.log(data.result);

      }
      else
      {
        console.log("false");
      }


    });

  }

  route_thread(id)
  {
    this.router.navigate(['/thread',id]);
  }

}
