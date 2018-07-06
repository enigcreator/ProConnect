import { Component, OnInit, Input } from '@angular/core';
import { ThreadsService} from '../services/threads.service';
import { Thread } from '../thread';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { HelpingService } from '../services/helping.service';

@Component({
  selector: 'app-deep-home',
  templateUrl: './deep-home.component.html',
  styleUrls: ['./deep-home.component.css']
})
export class DeepHomeComponent implements OnInit {

  
  OPTION: String;


  threads: any = new Array;
  round:String = 'round';
  success:Boolean = false;
  start_post:number = 0;
  continue_load: boolean = true;
  private noOfItemsToShowInitially: number = 10;
  private itemsToLoad: number = 10;
  public itemsToShow : any;
  public isFullListDisplayed: boolean = false;
  logInSubscription : any;
  isLoggedIn: boolean;

  constructor(private threadService: ThreadsService,
              private router: Router,
              private helper: HelpingService,
              private authService: AuthServiceService,
              private activatedRoute: ActivatedRoute) {


    

    this.isLoggedIn = this.authService.isLoggedIn;
    this.logInSubscription = this.authService.logInStatusChange.subscribe((value) =>{

      this.isLoggedIn = value;

    });
      
   


   }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params)=>{
      this.OPTION = params.option;
      if(this.OPTION == "newest")
        this.get_threads();
      else if (this.OPTION == "top")
        this.get_threads_top();
      else if (this.OPTION == "subscribed")
        this.get_threads_user();
    });
    
  }


  onScroll() {

    if(this.continue_load)
    {

      if(this.OPTION == "newest")
        this.get_threads();
      else if (this.OPTION == "top")
        this.get_threads_top();
      else if (this.OPTION == "subscribed")
        this.get_threads_user();
     
    }
  }



  get_threads_top()
  {

    this.threadService.get_top_threads(this.start_post,this.itemsToLoad).subscribe(data => {
      if(data.success)
      {

        for(let i=0; i<data.result.length ; i++)
       {
           this.threads.push(data.result[i]);
       }

       this.getTags(this.start_post);
       this.itemsToShow = this.threads.slice(0, this.noOfItemsToShowInitially);
       this.noOfItemsToShowInitially += this.itemsToLoad;
       this.start_post += this.itemsToLoad;
      }
      else
      {
        this.continue_load = false;
        this.start_post += this.itemsToLoad;
      }
    });


  }


  get_threads_user()
  {

    this.threadService.get_thread_user(this.authService.user.id,this.start_post,this.itemsToLoad).subscribe(data => {
      if(data.success)
      {

        for(let i=0; i<data.result.length ; i++)
       {
           this.threads.push(data.result[i]);
       }

       this.getTags(this.start_post);
       this.itemsToShow = this.threads.slice(0, this.noOfItemsToShowInitially);
       this.noOfItemsToShowInitially += this.itemsToLoad;
       this.start_post += this.itemsToLoad;
      }
      else
      {
        this.continue_load = false;
        this.start_post += this.itemsToLoad;
      }
    });


  }

  get_threads()
  {


    this.threadService.get_latest_threads(this.start_post,this.itemsToLoad).subscribe(data => {
      if(data.success)
      {

        for(let i=0; i<data.result.length ; i++)
       {
           this.threads.push(data.result[i]);
       }

       this.getTags(this.start_post);
       this.itemsToShow = this.threads.slice(0, this.noOfItemsToShowInitially);
       this.noOfItemsToShowInitially += this.itemsToLoad;
       this.start_post += this.itemsToLoad;

        console.log(this.itemsToShow);
      }
      else
      {
        this.continue_load = false;
        this.start_post += this.itemsToLoad;
      }
    });


  }

  getTags(start)
  {
    for(let i=start; i<this.threads.length ; i++)
       {
        
        this.threadService.getThreadTags(this.threads[i].id).subscribe(data =>{

         // console.log(this.threads[i].id + "result =" +data.result);
          if(data.success)
          {
       
      
              this.threads[i].tags = new Array();
              for(let j = 0; j<data.result.length;j++)
              {
                this.threads[i].tags[j] = data.result[j];
              
            }
    
          }

        });


       }
  }

  
    thread_page(id)
    {
      this.router.navigate(['/thread',id]);
    }


    top ()
    {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/dhome","top"]));
    }

    newest ()
    {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/dhome","newest"]));
    }

    subscribed ()
    {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/dhome","subscribed"]));
    }


}
