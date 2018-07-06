import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AuthServiceService  } from '../services/auth-service.service';
import { ActivatedRoute} from '@angular/router';
import { HelpingService } from '../services/helping.service';
import {NgxAutoScroll} from "ngx-auto-scroll";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

  display: any;
  chat : any = new Array;
  paramId: any;
  sessionid: any;
  text: any;
  refresh: any;
  private noOfItemsToShowInitially: number = 10;
  private itemsToLoad: number = 10;
  public itemsToShow : any;
  public isFullListDisplayed: boolean = false;
  recipient_name = String;

  constructor(private socketService: SocketService,
              private authService: AuthServiceService,
              private activatedRoute: ActivatedRoute,
              private helperService: HelpingService,
              private usersService: UsersService) {

        
   }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params)=>{
      this.paramId = params.id;});


      this.usersService.getName(this.paramId).subscribe(data => {
        this.recipient_name = data.result[0].display_name;
      })
    
   
    this.receive_all_once();
    this.socketService.initSocket();
    
    this.handshake();
  
    this.req_all_chat();

    this.receive_all_chat();

    
    
  }

  onScroll() {


  }

  onScrollUp() {

  }

  handshake()
  {

    this.refresh = this.socketService.handshake_1()
    .subscribe((data) => {
      this.socketService.updateSockets(this.authService.user.id);
    });
  }

  req_all_chat()
  {
    
    this.socketService.request_all_chat({'from':this.authService.user.id,'to':this.paramId, 'id':this.sessionid});
  }

  receive_all_once()
  {
    console.log(this.authService.user.id, this.paramId)
    this.helperService.get_chat(this.authService.user.id,this.paramId).subscribe((data)=>{


      if(data.success == false)
      {
        console.log('unable to fetch chat');
      }
      else
      {
        for(let i = 0; i<data.result.length;i++)
        {
          this.chat.push(data.result[i]);
        }
      }

    });
  }

  receive_all_chat()
  {
    this.socketService.receive_all_chat()
    .subscribe((data) => {
      console.log(data);
      this.chat.push(data[0]);
      this.forceScrollDown();
    });
  }



test()
{
  console.log(this.authService.user);
}

sendMessage()
{
  this.socketService.send({"text": this.text, "from": this.authService.user.id, "to": this.paramId});
  this.text = "";
}


public forceScrollDown(): void {
  this.ngxAutoScroll.forceScrollDown();
}

}

