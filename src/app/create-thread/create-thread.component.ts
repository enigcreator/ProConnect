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
    cat_id: number = 0;
    tag_0: String;
    tag_1: String;
    tag_2: String;
    tag_3: String;
    tag_4: String;
   
    constructor(private threadService: ThreadsService,
    private authService: AuthServiceService) {
  
          
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


        this.threadService.insertThread({'brief': this.title, "category_id" : this.cat_id, 'tags': [this.tag_0, this.tag_1,this.tag_2,this.tag_3,this.tag_4]}).subscribe(data => {

          console.log(this.cat_id);
          if(data.success == true)
          {
            console.log("TRUE :" + data);

            res(data.insertId);
          }
          else
          {
            console.log("HERE :" + data);
            rej(data);
          }
  
        });


      });
      
    }

    insertPost(id)
    {
      return new Promise((res, rej) => {

      this.threadService.insert_post_simple({'details': this.content, 'author': this.authService.user.id, 'thread': id}).subscribe(data => {

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