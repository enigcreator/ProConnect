const mySqlQuery = require('../database.js');





module.exports.insert = function(req, callback)
{
    mySqlQuery('insert into comments (brief, author) values ("'+req.brief+'","'+req.author+'")', null, (err, rows) => {

        if(err)
            {
                callback(err, null);
                throw err;
                
            }
        else
        {
            mySqlQuery('insert into post_comments values ('+req.post_id+','+rows.insertId+')', null, (err, rows) => {


                if(err)
                {
                    console.log(err);
                    throw err;
                    callback(err, null);
               }
               else
               {
                   callback(null, rows);
               }
            });
        }

    });
}


module.exports.getAllComments = function(id, callback)
{

    mySqlQuery("select DATEDIFF(CURRENT_TIMESTAMP, date_created) AS days, display_name,brief,date_created,author from user as C inner join (select * from comments A where A.id in (SELECT comment_id from post_comments where post_id = "+id+")) as D where C.id = D.author", null, (err, rows) => {

         if (err)
        {
             throw err;
             callback(err, null);
         }
         else
         {
             callback(null, rows);
         }

    });


}