const mySqlQuery = require('../database.js');

class postModel {

    constructor(){

        this.details = null;
        this.author = null;
        this.date_created = null;
        this.up_vote = null;
        this.down_vote = null;
        this.tags = null;
        this.thread = null;
    }

}

module.exports = {
    postModel
};



module.exports.getCommentIds = function (id, callback)
{
    mySqlQuery("select comment_id from post_comments where post_id = "+id+"", null, callback);
}

module.exports.insert = function (post, callback)
{


        mySqlQuery("insert into post (details, author) values ('"+post.details+"',  '"+post.author+"' );", null, (err, result_2) => {

            if (err)
            {
               // console.log(err);
                callback(err, null);
            }
            else
            {
                mySqlQuery("insert into threads_posts values ('"+post.thread+"','"+result_2.insertId+"')", null, (err, rows ) => {


                    if(err)
                    {
                        //console.log(err);
                        // throw err;
                        callback(err, null);
                    }
                    else
                    {
                        mySqlQuery("insert into notifications (user_id, thread_id, notification) values ("+post.author+","+post.thread+",'New Answer');", null, (err, rows_2) =>{

                        if(err)
                        {
                           // console.log(err);
                            // throw err;
                            callback(err, null);
                        }
                        else
                        {
                            callback(null, result_2.insertId);

                        }


                        });
                    }

                });
            
            }

        });
        

}

module.exports.insert_simple = function (post, callback)
{


        var temp = {details: post.details, author: post.author};

        mySqlQuery("insert into post set ?", temp , (err, result_2) => {

            if (err)
            {
               // console.log(err);
                callback(err, null);
            }
            else
            {
                callback(null, result_2.insertId );
            }
        });
        

}

module.exports.getPostbyId = function (id, callback) {

mySqlQuery("select * from post A where A.id = '"+id+"'", null, callback);


}


