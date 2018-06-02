const mySqlQuery = require('../database.js');

class threadModel {

    constructor() {

        this.brief = null;
        this.op_post = null;
        this.cat_id = null;
        this.tags = null;
    }

}

module.exports = {
    threadModel
};


module.exports.insert = function (thread, callback) {

    var tags = thread.tags;
    if(tags.length>0)
    {

        mySqlQuery("insert into thread (brief, category_id) values ('"+thread.brief+"', '"+thread.cat_id+"')", null, (err, rows) => 
        {

            
            if(err)
               {
                    callback(err, null);
               }

            else
            {
            // code for adding tags intelligently
                for (let i=0;i<tags.length;i++)
                {

        
                    mySqlQuery("select id from tags where name = '"+tags[i]+"'", null, (err, rows_1) =>
                    {
        
                        if (err)
                        {
                            // throw err;
                        }

                        else if(rows_1[0] == null)
                        {
                            mySqlQuery("insert into tags (name) values ('"+tags[i]+"');", null, (err, rows_2) => 
                            {
                                if (err)
                                {
                                    // throw err;
                                }

                                else {

                                mySqlQuery("update thread set tag_"+i+" = '"+(rows_2.insertId+'-'+tags[i])+"' where id = "+rows.insertId+";", null, (err, result) => {

                                    if (err)
                                    {
                                        console.log(err);
                                        // throw err;
                                    }

                                });
                            }

                            });
                        }


                        else
                        {

                            mySqlQuery("update thread set tag_"+i+" = '"+(rows_1[0].id+'-'+tags[i])+"' where id = "+rows.insertId+";", null, (err, result) => {

                                if (err)
                                {
                                    console.log(err);
                                    // throw err;
                                }
                                else 
                                {
                                    mySqlQuery("update tags set threads_count = threads_count + 1 where id = "+rows_1[0].id+";", null, (err, result) => {
                                        if (err)
                                        {
                                            console.log(err);
                                            // throw err;
                                        }
                        
                                    });
                                }
                            });

                        }

                    });           

                }

                callback(null, rows.insertId);

            }
        });
    }

    else {

        mySqlQuery("insert into thread (brief, category_id) values ('"+thread.brief+"', '"+thread.cat_id+"')", null, callback);
        
    }


};


module.exports.getThreadPostIds = function (id, callback) {

    mySqlQuery("select post_id from threads_posts where thread_id = "+id, null, callback);
}

module.exports.getThreadById = function (id, callback) {

    mySqlQuery("select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author and D.id = '"+id+"'", null, callback);
}

module.exports.getNotifications = function (id, callback) {
    console.log(id);
    mySqlQuery("select * from notifications where user_id = "+id+"", null, callback);
}

module.exports.updateOp = function (req, callback) {

    mySqlQuery("update thread set original_post_id = "+req.id+"  where id = "+req.thread+";", null, callback);

}

module.exports.getByTime = function (count, callback) {

    mySqlQuery("select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author,B.date_created, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by D.date_created desc limit "+count+"", null, callback);

}

module.exports.getByViews = function (count, callback) {
  
    mySqlQuery("select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by views desc limit "+count+"", null, callback);

}


module.exports.getByAnswers = function (count, callback) {
  
    mySqlQuery("select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by answers_count desc limit "+count+"", null, callback);

}

module.exports.getThreadTags = function (id, callback)
{
    mySqlQuery("select name from tags where id in (select tag_0 from thread where id = 39)", null, callback);
}

module.exports.getAllPosts = function (id, callback)
{

    mySqlQuery("select * from post where id in (select post_id from threads_posts where thread_id = "+id+")", null, callback);

}

module.exports.getAllTags = function (req, callback)
{
    mySqlQuery("select * from tags", null, callback);
}