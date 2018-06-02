import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Thread } from '../thread';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {

  currentThread: Thread;
  currentParamId: number;
  currentThreadPostIds: any;
  original_post: any;
  post: any;
  temp: number;
  content:any;
  comment: any;
  mode_main: any;
  logInSubscription: any;
  isLoggedIn : boolean;
  disableAll: boolean;

  constructor(private threadService: ThreadsService,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              private authService: AuthServiceService) {
              this.mode_main = "preview";
              this.isLoggedIn = authService.isLoggedIn;
   

      

               }

  ngOnInit() {

    
    this.getCurrentThread();

  }


  

  get_all_users_in_posts()
  {

    for(let i=0; i<this.post.length; i++)
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

    for(let i=0; i<this.post.length; i++)
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

    this.threadService.getAllPosts(this.currentParamId).subscribe((data)=>{
      if(data.success)
      {
        this.post = new Array;
        this.post = data.result;
        this.get_all_users_in_posts();
      }
    });


  }

  get_original_post()
  {
    
    this.threadService.getPostById(this.currentThread[0].original_post_id).subscribe((data)=>{

      if(data.success)
      {

        this.original_post = data.result;
        console.log(this.original_post);

        this.threadService.get_all_comments(this.original_post[0].id).subscribe((data) => {

          if(data.success)
          {
          this.original_post[0].comments = data.result;
          }
          else
          console.log("FALSE");

          this.get_all_posts();

        });
        
      }

      else console.log("false");
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
      console.log("false");
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
          
          this.get_original_post();

         

          this.currentThread[0].tag_0 = (this.currentThread[0].tag_0.split('-')[1]);
          this.currentThread[0].tag_1 = (this.currentThread[0].tag_1.split('-')[1]);
          this.currentThread[0].tag_2 = (this.currentThread[0].tag_2.split('-')[1]);
          this.currentThread[0].tag_3 = (this.currentThread[0].tag_3.split('-')[1]);
          this.currentThread[0].tag_4 = (this.currentThread[0].tag_4.split('-')[1]);
          console.log(this.currentThread);
        }
      });



      resolve(this.currentThread);
    });
  
  });

  

}

  insertPost()
  {

    this.threadService.insert_post({"details": this.content, "author": this.authService.user.id,"thread": this.currentParamId}).subscribe((data) => {

      if(data.success)
      {
        this.get_all_posts();
        this.content="";
      }
    });
  
  }

  insertComment(id)
  {
    console.log("here");
    this.threadService.insert_comment({"brief":this.comment, "author":this.authService.user.id, "post_id": id}).subscribe(data => {

      if(data.success)
      {
        this.get_all_comments_in_posts();
        this.comment="";
      }

    });
  }


  insertCommentMain()
  {
    console.log("here");
    this.threadService.insert_comment({"brief":this.comment, "author":this.authService.user.id, "post_id": this.original_post[0].id}).subscribe(data => {

      if(data.success)
      {
        this.threadService.get_all_comments(this.original_post[0].id).subscribe((data) => {

          if(data.success)
          {
          this.original_post[0].comments = data.result;
          }
          else
          console.log("FALSE");

      });

      this.comment="";
    }

    });
  }


}