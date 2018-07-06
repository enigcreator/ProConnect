import { Component, OnInit, Input } from '@angular/core';
import { ThreadsService} from '../services/threads.service';
import { Thread } from '../thread';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-threads',
  templateUrl: './user-threads.component.html',
  styleUrls: ['./user-threads.component.css']
})
export class UserThreadsComponent implements OnInit {

  @Input() options: any;


  text:string = "hello";

  threads: Thread[] = new Array;
  round:String = 'round';
  success:Boolean = false;
  start_post:number = 0;
  continue_load: boolean = true;
  private noOfItemsToShowInitially: number = 10;
  private itemsToLoad: number = 10;
  public itemsToShow : any;
  public isFullListDisplayed: boolean = false;

  constructor(private threadService: ThreadsService,
              private router: Router) {


    


   }

  ngOnInit() {
    

    this.get_threads();
  }


  onScroll() {

    if(this.options.selection != 'top')
      if(this.continue_load && this.itemsToShow.length<=10)
      {
        this.get_threads();
      
      }
      else
      if(this.continue_load )
      {
        this.get_threads();
      
      }
  }

  get_threads()
  {


    if(this.options.selection == "top")
    {
        this.threadService.getThreadbyUserTop(this.options.user_id,this.start_post,this.itemsToLoad).subscribe(data => {
          if(data.success)
          {

            for(let i=0; i<data.result.length ; i++)
          {
              this.threads.push(data.result[i]);
          }

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
      else 
      {

        this.threadService.getThreadbyUser(this.options.user_id,this.start_post,this.itemsToLoad).subscribe(data => {
          if(data.success)
          {

            for(let i=0; i<data.result.length ; i++)
          {
              this.threads.push(data.result[i]);
          }

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

  }


    thread_page(id)
    {
      this.router.navigate(['/thread',id]);
    }





}
