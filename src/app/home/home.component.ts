import { Component, OnInit } from '@angular/core';
import { ThreadsService} from '../services/threads.service';
import { Thread } from '../thread';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  threads: Thread[];

  constructor(private threadService: ThreadsService,
              private router: Router) {

        
    this.get_latest_threads(50);


   }

  ngOnInit() {

    
    
  }



  get_latest_threads(count)
  {
    this.threadService.get_latest_threads(count).subscribe(data => {

      if(data.success)
      {

        this.threads = data.result;
        
        this.threads.forEach(item => {

          item.tags = new Array();

          item.tags.push(item.tag_0.split('-')[1]);
          item.tags.push(item.tag_1.split('-')[1]);
          item.tags.push(item.tag_2.split('-')[1]);
          item.tags.push(item.tag_3.split('-')[1]);
          item.tags.push(item.tag_4.split('-')[1]);

        });



      }

    });

    

    
  }


    thread_page(id)
    {
      this.router.navigate(['/thread',id]);
    }



    getHot(count)
    {
      this.threads = null;

      this.threadService.get_hot_threads(count).subscribe(data => {

        if(data.success)
        {
  
          this.threads = data.result;
          
          this.threads.forEach(item => {
  
            item.tags = new Array();
  
            item.tags.push(item.tag_0.split('-')[1]);
            item.tags.push(item.tag_1.split('-')[1]);
            item.tags.push(item.tag_2.split('-')[1]);
            item.tags.push(item.tag_3.split('-')[1]);
            item.tags.push(item.tag_4.split('-')[1]);
  
          });
  
  
  
        }
  
      });
      
    }



    getTop(count)
    {
      this.threads = null;

      this.threadService.get_top_threads(count).subscribe(data => {

        if(data.success)
        {
  
          this.threads = data.result;
          
          this.threads.forEach(item => {
  
            item.tags = new Array();

            item.tags.push(item.tag_0.split('-')[1]);
            item.tags.push(item.tag_1.split('-')[1]);
            item.tags.push(item.tag_2.split('-')[1]);
            item.tags.push(item.tag_3.split('-')[1]);
            item.tags.push(item.tag_4.split('-')[1]);
  
          });
  
  
  
        }
  
      });
      
    }


}
