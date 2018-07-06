import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { UsersService } from '../services/users.service';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Url } from 'url';

const URL = 'http://localhost:3000/img/';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showPicker: boolean = false;
  user: any;
  url: "";
  path: SafeUrl;
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  
  constructor(private authService: AuthServiceService,
              private userService: UsersService,
              private http: Http,
              private el: ElementRef,
              private _DomSanitizationService: DomSanitizer) {

      
    
    
    
   }


  ngOnInit() {
    this.user = this.authService.user;
    this.path = this._DomSanitizationService.bypassSecurityTrustUrl(this.user.img);

    
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        
        this.userService.setImg({id:this.user.id,path:response}).subscribe(data => {

            console.log(this.user.id, response);
           
            this.userService.getImg({id:this.user.id}).subscribe(data => {

                this.authService.user.img = data.result[0].img;
                this.path = this._DomSanitizationService.bypassSecurityTrustUrl(data.result[0].img);
                this.user.img = this.authService.user.img;
                this.authService.updateData();
                this.path = this.user.img;
            });

        });
     };
 }



}