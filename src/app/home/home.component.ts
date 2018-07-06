import { Component, OnInit } from '@angular/core';
import { ThreadsService} from '../services/threads.service';
import { Thread } from '../thread';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any = new Array;
  round:String = 'round';
  success:Boolean = false;
  start_post:number = 0;
  continue_load: boolean = true;
  private noOfItemsToShowInitially: number = 5;
  private itemsToLoad: number = 5;
  public itemsToShow : any;
  public isFullListDisplayed: boolean = false;
  logInSubscription : any;
  isLoggedIn: boolean;
  tags_start: number = 0;
 
  constructor(private threadService: ThreadsService,
              private router: Router,
              private authService: AuthServiceService) {

    this.isLoggedIn = this.authService.isLoggedIn;
    this.logInSubscription = this.authService.logInStatusChange.subscribe((value) =>{

      this.isLoggedIn = value;

    });
    this.get_categories();


   }

  ngOnInit() {

    
    
  }


  onScroll() {

    console.log(this.itemsToShow);
    if(this.continue_load)
    {
      this.get_categories();
     
    }
  }

  get_categories()
  {


    this.threadService.getAllCategory(this.start_post, this.itemsToLoad).subscribe(data => {
      if(data.success)
      {

        for(let i=0; i<data.result.length ; i++)
       {
           this.categories.push(data.result[i]);
       }

       this.itemsToShow = this.categories.slice(0, this.noOfItemsToShowInitially);
       this.getTags(this.tags_start);
       this.getThreads(this.tags_start);
       this.tags_start+=5;
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

  getTags(start)
  {
    for(let i=start; i<this.categories.length ; i++)
       {
        
        this.threadService.getCategoryTags(this.categories[i].id).subscribe(data =>{

         // console.log(this.categories[i].id + "result =" +data.result);
          if(data.success)
          {
       
      
              this.categories[i].tags = new Array();
              for(let j = 0; j<data.result.length;j++)
              {
                this.categories[i].tags[j] = data.result[j];
              
            }
    
          }

        });


       }
  }

  getThreads(start)
  {
    for(let i=start; i<this.categories.length ; i++)
       {
        
        this.threadService.getCategoryThreads(this.categories[i].id).subscribe(data =>{

         // console.log(this.categories[i].id + "result =" +data.result);
          if(data.success)
          {
       
      
              this.categories[i].threads = new Array();
              for(let j = 0; j<data.result.length;j++)
              {
                this.categories[i].threads[j] = data.result[j];
              
            }
    
            console.log(this.categories[i].threads);
          }

        });


       }
  }

    threadPage(id)
    {
      this.router.navigate(['/thread',id]);
    }

    navigate(type)
    {
      this.router.navigate(['/dhome',"newest"]);
    }
    subscribed()
    {
      this.router.navigate(['/dhome',"subscribed"]);
    }


}
