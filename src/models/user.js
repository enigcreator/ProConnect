const mySqlQuery = require('../database.js');
const bcrypt = require('bcryptjs');

//User authentication model
class UserModel {
    constructor()
    {
        this.password = null;
        this.email = null;
        this.display_name = null;
        this.last_name = null;
        this.location = null;
    }
}

module.exports = {
    UserModel
};

module.exports.getDisplayNameById = function (userId, callback)
{
    mySqlQuery("select display_name from user where id = "+userId+"", null, callback);
}

module.exports.getUserDetailById = function(userId, callback)
{
    mySqlQuery("select A.*, B.country_name from user A inner join locations B on A.location_id = B.id where A.id ='"+userId+"'", callback);
}

module.exports.getUserByEmail = function(userEmail, callback)
{
    mySqlQuery("select * from user_authentications where ?",{email : userEmail}, callback);
}

module.exports.addUser = function(user, callback)
{
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y/m/d');

    bcrypt.genSalt(10, (err, salt) =>
    {
            bcrypt.hash(newUser.password, salt, (err, hash) =>
        {
            if(err)
                throw err;

            newUser.password = hash;
            

            mySqlQuery("insert into user (display_name,last_name, join_date, profile_views, posts_created, thanked_times, received_thanks, level, location_id) values ('"+user.display_name+"','"+user.last_name+"', '"+formatted+"', 0, 0, 0, 0, 0, 1);", null, (err, rows) =>
            {
                if (err) throw err;
                else {
                var new_params = {user_id : rows.insertId, email : user.email, password : user.password};
                mySqlQuery("insert into user_authentications set ?", new_params, callback);
                }

            });




        });
        
        
    });

}

module.exports.getAllEmails = function(req, callback)
{
    mySqlQuery("select email from user_authentications", null, callback);
}

module.exports.getAll = function(req, callback)
{

    mySqlQuery('select * from user', null, callback);

}

module.exports.comparePassword = function(candidatePassword, hash, callback)
{

    bcrypt.compare(candidatePassword, hash, (err, isMatch) => 
    {
      if(err) 
        throw err;

      callback(null, isMatch);
    });
  }

  module.exports.setImg = function (data, callback)
  {
  
  
        console.log(data.id);
      var temp = data.path.slice(26,);
      console.log(temp);
      var temp2 = "http://localhost:3000/assets/images/uploads/" + temp;
    console.log(temp2);
      mySqlQuery("update user set img = '"+temp2+"' where id = "+data.id+"", null, callback);
  }

  module.exports.getImg = function (data, callback)
  {
      mySqlQuery("select img from user where id = "+data.id+"", null, callback);
  }