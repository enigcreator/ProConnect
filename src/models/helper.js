const mySqlQuery = require('../database.js');


module.exports.getAllLocations = function(callback)
{
    mySqlQuery('select * from locations',null, callback);
}

