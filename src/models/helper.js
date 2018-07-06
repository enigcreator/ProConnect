const mySqlQuery = require('../database.js');


module.exports.getAllLocations = function(callback)
{
    mySqlQuery('select * from locations',null, callback);
}

module.exports.getTag = function(id, callback)
{
    mySqlQuery('select * from tags where id = '+id, null, callback);
}

module.exports.getAllChat = function (data, callback)
{
    mySqlQuery("select * from message where from_user_id in ("+data.from+","+data.to+")  and to_user_id in ("+data.from+","+data.to+")",null, callback);
}