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

    console.log(thread);
    var tags = thread.tags;
    if(tags.length>0)
    {

        mySqlQuery("insert into thread (brief, category_id) values ('"+thread.brief+"', '"+thread.cat_id+"')", null, (err, rows) => 
        {

                if (err) {

                    callback(err, null);
                }
                else {


                mySqlQuery("insert into category_threads values ("+thread.cat_id+","+rows.insertId+")", null, (err, start) => {

                if (err)
                {
                        callback(err, null);
                }


                else
                {
                    mySqlQuery("update categories set thread_count = thread_count + 1 where id = "+thread.cat_id+" ", null, (err, result2) => {

                        console.log(result2);
                        if (err)
                        {
                            console.log(err);
                            // throw err;
                        }
                        else
                        {
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

                                    mySqlQuery("INSERT INTO `thread_tags` (`thread_id`, `tag_id`) VALUES ("+rows.insertId+", "+rows_2.insertId+");", null, (err, result) => {

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

                        }

                    });
                // code for adding tags intelligently
                    

                    callback(null, rows.insertId);

                }


                    });
            
                

        }
        });
        
    }

    else {

        console.log("executing without tags");
        mySqlQuery("insert into thread (brief, category_id) values ('"+thread.brief+"', '"+thread.cat_id+"')", null, (err, rows) => {

            if(err)
            {
                callback(err, null);
                console.log(err);
            }
            else
            {
                mySqlQuery("insert into category_threads values ("+thread.cat_id+","+rows.insertId+")", null, (err, start) => {

                    if(err)
                    {
                        callback(err, null);
                        console.log(err);

                    }
                    else
                    {
                        mySqlQuery("update categories set thread_count = thread_count + 1 where id = "+thread.cat_id+" ", null, (err, result2) => {

                            if (err)
                            {
                                console.log(err);
                                callback(err, null);
                                // throw err;
                            }
                            else
                            {
                                callback(null, rows.insertId);
                            }

                        });
                        
                    }
                });

            }


        });
        
    }


};


module.exports.getThreadPostIds = function (id, callback) {

    mySqlQuery("select post_id from threads_posts where thread_id = "+id, null, callback);
}

module.exports.getThreadById = function (id, callback) {

    mySqlQuery("select E.name, F.* from categories E inner join (select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author and D.id = "+id+") F on E.id = F.category_id", null, callback);
}

module.exports.getNotifications = function (id, callback) {
    console.log(id);
    mySqlQuery("select * from notifications where user_id = "+id+"", null, callback);
}

module.exports.updateOp = function (req, callback) {

    mySqlQuery("update thread set original_post_id = "+req.id+"  where id = "+req.thread+";", null, callback);

}

module.exports.getByTime = function (data, callback) {


    mySqlQuery("select E.name, F.* from categories E INNER Join (select DATEDIFF(CURRENT_TIMESTAMP,D.date_created) days , D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author,B.date_created,B.details, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by D.date_created) F on E.id = F.category_id  order by date_created desc limit "+data.start+", "+data.limit+"", null, callback);

}


module.exports.getByIdVotes = function (data, callback) {
    mySqlQuery("select E.name, F.* from categories E INNER Join (select DATEDIFF(CURRENT_TIMESTAMP,D.date_created) days , D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author,B.date_created,B.details, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by D.date_created) F on E.id = F.category_id ORDER BY votes desc limit "+data.start+", "+data.limit+"", null, callback);
}

module.exports.getById = function (data, callback) {
    mySqlQuery("select D.details, D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author,B.date_created,B.details, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id AND B.author = "+data.id+") as D where C.id = D.author  limit "+data.start+", "+data.limit+"", null, callback);
}
module.exports.getByViews = function (count, callback) {
  
    mySqlQuery("select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by views desc limit "+count+"", null, callback);

}

module.exports.getByUser = function (data, callback) {

    console.log(data);
    mySqlQuery("select E.name, F.* from categories E INNER Join (select DATEDIFF(CURRENT_TIMESTAMP,D.date_created) days , D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author,B.date_created,B.details, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by D.date_created) F on E.id = F.category_id where author = "+data.id+" limit "+data.start+", "+data.limit+"", null, callback);

}

module.exports.getByAnswers = function (count, callback) {
  
    mySqlQuery("select D.*, C.id as user_id, C.display_name, C.join_date from user C inner join (select A.*, B.author, B.up_vote-B.down_vote as votes from thread A inner join post B where A.original_post_id = B.id) as D where C.id = D.author order by answers_count desc limit "+count+"", null, callback);

}

module.exports.getThreadTags = function (id, callback)
{
    mySqlQuery("select name from tags where id in (select tag_0 from thread where id = 39)", null, callback);
}

module.exports.getAllPosts = function (data, callback)
{

    console.log(data);
    mySqlQuery("select A.id as id, DATEDIFF(CURRENT_TIMESTAMP,A.date_created) AS days, A.details, A.date_created,A.up_vote,A.down_vote from post A where id in (select post_id from threads_posts where thread_id = "+data.id+") ORDER BY date_created ASC LIMIT "+data.start+", "+data.end+"", null, callback);

}

module.exports.getAllTags = function (req, callback)
{
    mySqlQuery("select * from tags", null, callback);
}

module.exports.setAssociation = function(data, callback)
{
    console.log(data);
    mySqlQuery("insert into thread_associations (thread_id, user_id) values ("+data.thread_id+","+data.user_id+")", null, callback);

}


module.exports.getTags = function (id, callback)
{

    console.log(id);
    mySqlQuery("select * from tags where id in (select tag_id from thread_tags where thread_id = "+id+")", null, (err, rows)=>{

        if (err)
        {
            callback(err,null);
        }
        else
        {
            callback(null, rows);
        }


    });


}
