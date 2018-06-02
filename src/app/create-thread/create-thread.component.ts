import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Thread } from '../thread';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
    selector: 'app-create-thread',
    templateUrl: './create-thread.component.html',
    styleUrls: ['./create-thread.component.css']
  })

  export class CreateThreadComponent implements OnInit {


    title: String;
    content: String;
   
    constructor(private threadService: ThreadsService) {
  
          
     }
  
    ngOnInit() {
  
      
    }

    onGo()
    {

      this.insertThread().then(

        (id) => {
          
          this.insertPost(id).then(

            (post_id) => {
              
              this.updateOp(id, post_id).then(

                () => console.log("all done"),
                (data) => console.log(data)

              );
              
            },
            (inner_data) => console.log(inner_data)


          );



        },

        (data) => console.log(data)

      );


    }


    insertThread()
    {
      
        return new Promise((res, rej) => {


        this.threadService.insertThread({'brief': this.title, "category_id" : 1, 'tags': ['ten']}).subscribe(data => {

          if(data.success == true)
          {
            res(data.insertId);
          }
          else
          {
            rej(data);
          }
  
        });


      });
      
    }

    insertPost(id)
    {
      return new Promise((res, rej) => {

      this.threadService.insert_post_simple({'details': this.content, 'author': 1, 'thread': id}).subscribe(data => {

        if(data.success == true)
        {
          res(data.insertId);
        }
        else
        {
          rej(data);
        }

      });

    });
    }



    updateOp(thread_id, post_id)
    {
      return new Promise((res, rej) => {

        this.threadService.opThread({'thread': thread_id, 'id': post_id}).subscribe(data => {

          if(data.success == true)
          {
            res();
          }
          else
          {
            rej(data);
          }

        });


      });
    }
}