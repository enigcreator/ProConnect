import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AuthServiceService  } from '../services/auth-service.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  display: any;
  chat : any;
  paramId: any;
  sessionid: any;
  text: any;
  refresh: any;

  constructor(private socketService: SocketService,
              private authService: AuthServiceService,
              private activatedRoute: ActivatedRoute) {

        
   }

  ngOnInit() {

    
   
    console.log(this.authService.user.id);
    this.socketService.initSocket();
    
    this.handshake();
  
    this.req_all_chat();

    this.receive_all_chat();

    
    
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
    this.activatedRoute.params.subscribe((params)=>{
      this.paramId = params.id;
    this.socketService.request_all_chat({'from':this.authService.user.id,'to':this.paramId, 'id':this.sessionid});
    });
  }

  receive_all_chat()
  {
    this.chat = this.socketService.receive_all_chat()
    .subscribe((data) => {
      console.log(data);
      this.chat = data;
    });
  }



test()
{
  console.log(this.authService.user);
}

sendMessage()
{
  this.socketService.send({"text": this.authService.user.display_name+" :"+ this.text, "from": this.authService.user.id, "to": this.paramId})
}

}

