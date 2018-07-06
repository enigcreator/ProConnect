const mySqlQuery = require('../database.js');

module.exports.getAll = function (data, callback)
{
    console.log(data);

    mySqlQuery("select * from categories LIMIT "+data.start+","+data.limit+"", null, (err, rows)=>{
 
        if (err)
        {
            callback(err,null);
        }
        else
        {
            console.log(rows);
            callback(null, rows);
        }


    });


}

module.exports.getThreads = function (id, callback)
{

    mySqlQuery("select C.id, C.brief, D.date_created from Post D INNER JOIN (SELECT B.id, B.original_post_id, B.brief from category_threads A INNER JOIN thread B on A.thread_id = B.id AND cat_id = "+id+" ) C on C.original_post_id = D.id order by D.date_created Limit 0,4", null, (err, rows)=>{

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

module.exports.getTags = function (id, callback)
{

    mySqlQuery("select * from tags where id in (select tag_id from category_tags where cat_id = "+id+")", null, (err, rows)=>{

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