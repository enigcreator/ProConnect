const mySqlQuery = require('../database.js');
var mysql   = require('mysql');
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


        mySqlQuery("insert into post (details, author) values ("+mysql.escape(post.details)+","+post.author+")", (err, result_2) => {

            if (err)
            {
                console.log(err);
                callback(err, null);
            }
            else
            {
                mySqlQuery("insert into threads_posts values ('"+post.thread+"','"+result_2.insertId+"')", null, (err, rows ) => {


                    if(err)
                    {
                        console.log(err);
                        throw err;
                        callback(err, null);
                    }
                    else
                    {
                        mySqlQuery("insert into notifications (user_id, thread_id, notification) values ("+post.author+","+post.thread+",'New Answer');", null, (err, rows_2) =>{

                        if(err)
                        {
                           console.log(err);
                            throw err;
                            callback(err, null);
                        }
                        else
                        {
                            mySqlQuery("update thread set answers_count = answers_count +1 where id = "+post.thread+";",null, (err, rows_3) =>{

                                if(err)
                                    throw err;
                                    else
                                    callback(null, result_2.insertId);
                            });
                           

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

    
mySqlQuery("select A.id as id, DATEDIFF(CURRENT_TIMESTAMP,A.date_created) AS days, A.details, A.date_created,A.up_vote,A.down_vote,B.display_name,B.id as uid,B.join_date from post A inner join User B on A.author = B.id where A.id ="+id, null, callback);


}


module.exports.upVote = function (req, callback)
{
    mySqlQuery("update post set up_vote = up_vote + 1 where id = "+req.post_id+"", null, callback);
}
module.exports.downVote = function (req, callback)
{console.log(req);
    mySqlQuery("update post set down_vote = down_vote + 1 where id = "+req.post_id+"", null, callback);
}