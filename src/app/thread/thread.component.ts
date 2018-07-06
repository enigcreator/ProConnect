import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Thread } from '../thread';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { overlayConfigFactory } from 'ngx-modialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {

  mode:any = "preview";
  currentThread: Thread;
  currentParamId: number;
  currentThreadPostIds: any;
  original_post: any;
  post: any = new Array;
  temp: number;
  comment: any;
  mode_main: any;
  logInSubscription: any;
  isLoggedIn : boolean;
  disableAll: boolean;
  tData:Text ;
  round:String = 'round';
  success:Boolean = false;
  start_post:number = 0;
  continue_load: boolean = true;
  private noOfItemsToShowInitially: number = 3;
  private itemsToLoad: number = 3;
  public itemsToShow : any;
  public isFullListDisplayed: boolean = false;

  constructor(private threadService: ThreadsService,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private authService: AuthServiceService,
              public dialog: MatDialog)
  
              {
              this.mode_main = "preview";
              this.isLoggedIn = authService.isLoggedIn;
   

  
      

               }

  ngOnInit() {

    
    this.getCurrentThread();

  }

  onScroll() {

   // console.log(this.itemsToShow);
    if(this.continue_load)
    {
      this.get_all_posts();
     
    }


    /*if (this.noOfItemsToShowInitially <= this.post.length) {
        // Update ending position to select more items from the array
        this.noOfItemsToShowInitially += this.itemsToLoad;
        this.itemsToShow = this.items.slice(0, this.noOfItemsToShowInitially);
        console.log("scrolled");
    } else {
        this.isFullListDisplayed = true;
    }*/
}
  

  get_all_users_in_posts()
  {

    for(let i=this.start_post; i<this.post.length ; i++)
    {
      this.post[i].user = this.threadService.getUser(this.post[i].author).subscribe((data)=>{
        if(data.success)
        {
          this.post[i].user = data.user;
        }
      });
    }

    this.get_all_comments_in_posts();
  
  }

  get_all_comments_in_posts()
  {

   // console.log("post length : "+ this.post.length);
    for(let i=this.start_post; i<this.post.length  ; i++)
    {
       this.threadService.get_all_comments(this.post[i].id).subscribe((data)=>{
        if(data.success)
        {
          this.post[i].comments = data.result;
        }
      });
    }

  }
  get_all_posts()
  {


    this.threadService.getAllPosts(this.currentParamId,this.start_post,this.itemsToLoad).subscribe((data)=>{
      if(data.success)
      {

        for(let i=0; i<data.result.length ; i++)
       {
           this.post.push(data.result[i]);
       }
       

       
       this.get_all_comments_in_posts();
       this.get_all_users_in_posts();
       this.itemsToShow = this.post.slice(0, this.noOfItemsToShowInitially);
       this.noOfItemsToShowInitially += this.itemsToLoad;
       this.start_post += this.itemsToLoad;

       // console.log(this.itemsToShow);
      }
      else
      {
        this.continue_load = false;
        this.start_post += this.itemsToLoad;
      }
    });


  }

  get_original_post()
  {
    
    this.threadService.getPostById(this.currentThread[0].original_post_id).subscribe((data)=>{

      if(data.success)
      {
        this.original_post = data.result;

       // console.log(data.result);

          this.threadService.get_all_comments(this.original_post[0].id).subscribe((data) => {

          if(data.success)
          {
           // console.log("DATA" + data.result);
          this.original_post[0].comments = data.result;
        //  this.post.push(this.original_post[0]);
          }
          else
        //  console.log("FALSE");

          this.onScroll();

        });
        
      }

     //console.log("false");
    });

  }

  getPostIds()
  {
    return new Promise((resolve, reject)=> {
    this.threadService.get_thread_post_ids(this.currentParamId).subscribe((data)=>{

    if(data.success)
    {
      this.currentThreadPostIds = data.result;

    }
    else
    {
     // console.log("false");
    }

    });

    resolve();
  });


  }

  getCurrentThread()
  {
    return new Promise((resolve, reject) => {
    this.activatedRoute.params.subscribe((params)=>{
      this.currentParamId = params.id;

      this.threadService.get_thread_by_id(this.currentParamId).subscribe((data) => {

        if(data.success)
        {

          this.temp = data.result.id;
          this.currentThread = data.result;
          this.getTags();
          
          this.get_original_post();
          
         

         
        }
      });



      resolve(this.currentThread);
    });
  
  });

  

}

  insertPost(data:Text)
  {

    this.inner_query_insert_post(data, this.authService.user).then (
      ()=>this.setAssoc()
    );
    
  
  }

  inner_query_insert_post(data:Text, user:any)
  {
    return new Promise((res,rej)=>{
      this.threadService.insert_post({"details": data, "author": user.id, "last_display_name":user.display_name,"imgPath":user.img,"thread": this.currentParamId}).subscribe((data) => {

        if(data.success)
        {
  
          res();
        }
        else
        {
          rej();
        }
      });
    })
  }


  setAssoc(){
    return new Promise((res, rej) => {

      this.threadService.setAssociation({"user_id": this.authService.user.id, "thread_id": this.currentParamId}).subscribe(data =>{


      });

    });
  }

  insertComment(id, data)
  {
    this.setAssoc();
    //console.log("here");

    this.threadService.insert_comment({"brief":data, "author":this.authService.user.id, "post_id": id}).subscribe(data => {

      if(data.success)
      {
        this.get_all_comments_in_posts();
        this.comment="";
      }

    });
  }


  getTags()
  {
    this.currentThread[0].tags = new Array();

        this.threadService.getThreadTags(this.currentThread[0].id).subscribe(data =>{

         // console.log(this.threads[i].id + "result =" +data.result);
         
        // console.log("RESULT: "+data.result);

          if(data.success)
          {
       
      
              this.currentThread[0].tags = new Array();
              for(let j = 0; j<data.result.length;j++)
              {
                this.currentThread[0].tags[j] = data.result[j];
              
            }

        //    console.log("TAGS: " + this.currentThread[0].tags);
    
          }
         

        });


  }


  insertCommentMain()
  {
   // console.log("here");
    this.threadService.insert_comment({"brief":this.comment, "author":this.authService.user.id, "post_id": this.original_post[0].id}).subscribe(data => {

      if(data.success)
      {
        this.threadService.get_all_comments(this.original_post[0].id).subscribe((data) => {

          if(data.success)
          {
          this.original_post[0].comments = data.result;
          }
          
       //   console.log("FALSE");

      });

      this.comment="";
    }

    });
  }


  open(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
      data: {type:0, title: "Enter you Reply" , data: this.tData, success: this.success}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.result.success)
      {
      //  console.log("here");
       this.insertPost(result.result.data);
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
       this.router.navigate(["/thread",this.currentParamId]));
      }

    });
  }

  open_comment(id:number): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
      data: {type:1, title: "Enter you Comment" , data: this.tData, success: this.success}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.result.success)
      {
       // console.logconsole.log("here");
       this.insertComment(id,result.result.data);
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
       this.router.navigate(["/thread",this.currentParamId]));
      }

    });
  }


  upVote(id, i)
  {
    this.threadService.upVote({"user_id": this.authService.user.id, "post_id": id}).subscribe(data =>{
    });

   // console.log("index : " + i);
    this.post[id].up_vote++;
    this.itemsToShow[i].up_vote++;


  }
 downVote(id, i)
  {
    this.threadService.downVote({"user_id": this.authService.user.id, "post_id": id}).subscribe(data =>{
    });
    this.post[id].down_vote++;
    this.itemsToShow[i].down_vote++;
  }
  upVoteOP(id)
  {
    this.threadService.upVote({"user_id": this.authService.user.id, "post_id": id}).subscribe(data =>{
    });

    this.original_post[0].up_vote++;


  }
 downVoteOP(id)
  {
    this.threadService.downVote({"user_id": this.authService.user.id, "post_id": id}).subscribe(data =>{
    });
    this.original_post[0].down_vote++;
  }

}

