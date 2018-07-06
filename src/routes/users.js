const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mySql = require('../database.js');
const User = require('../models/user');
const config = require('../config/config');

// Register
router.post('/register', (req, res, next) => {
    newUser = new User.UserModel();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.display_name = req.body.display_name;
    newUser.location = req.body.location;
    newUser.last_name = req.body.last_name;
 
    User.addUser(newUser, (err, rows) =>
    {
      if(err){
        res.json({success: false, msg:'Failed to register user', error: err.code});
      } else {
        res.json({success: true, msg:'User registered'});
      }
    });

});

// Authenticate
router.post('/authenticate', (req, res, next) => 
{
  console.log("users called");
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, rows) => 
  {
    if(err) 
      throw err;

    if(rows[0] == null)
    {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, rows[0].password, (err, isMatch) => 
    {
      if(err) 
        throw err;

      if(isMatch)
      {
        const token = jwt.sign({data: rows[0]}, config.passport.secret, {
          expiresIn: 604800 // 1 week
        });


        User.getUserDetailById(rows[0].user_id, function (err, inner_rows) 
        {
          
          if(err)
          {
            throw err;
          }

          else if (inner_rows[0] == null)
          {
            return res.json({success: false, msg: 'User Details not found'});
          }

          else
          {
            console.log(inner_rows);
            res.json({
              success: true,
              token: 'Bearer '+token,
              user: 
              {
                id: inner_rows[0].id,
                img: inner_rows[0].img,
                display_name: inner_rows[0].display_name,
                join_date: inner_rows[0].join_date,
                profile_views: inner_rows[0].profile_views,
                posts_created: inner_rows[0].posts_created,
                thanked_times: inner_rows[0].thanked_times,
                received_thanks: inner_rows[0].received_thanks,
                level: inner_rows[0].level,
                location: inner_rows[0].country_name
              }
            });
          }


        });

       

      } 
      else 
      {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


router.get('/allEmails', (req, res, next ) => 
{
  User.getAllEmails(null, (err, rows) =>
  {
    if(err)
    {
   
        res.json({success: false, msg:'Failed to fetch user data', error: err.code});
    }
      else
      {
        res.json({success: true, result: rows});
      }
    });
  });


//router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => 
router.get('/profile', (req, res, next) => 
{
  
    User.getUserDetailById(req.query.id, (err, rows) => {

      if(err)
      {
        res.json({success: false, msg:'Failed to fetch user data', error: err.code});
      }

      else
      {

        if( rows[0] == null )
            res.json({success: false, msg:'No data'});

        res.json({success: true, user: rows[0]});
      }

    });

});


router.get('/name', (req,res, next) => {


  User.getDisplayNameById(req.query.id, (err, rows)=> {

    if (err)
      {
        console.log(err);
        return res.json({success:false});
      }
      else
      {
        return res.json({success:true, result: rows});
      }



  });


});
router.get('/setImg', (req, res, next) => {
 console.log("query:" +req.query);

  User.setImg(req.query, (err, rows) =>
  {

      if (err)
      {
        console.log(err);
        return res.json({success:false});
      }
      else
      {
        return res.json({success:true});
      }

  });
});

router.get('/getImg', (req, res, next) => {
  console.log("query:" +req.query);
  User.getImg(req.query, (err, rows) => {

    if(err)
      {
        console.log(err);
        res.send({success:false});
      }
      else
      {
        res.json({success:true, result: rows});
      }

  });


});






router.get('/getAllUsers', (req, res, next) => 
{
  
    User.getAll(null, (err, rows) => {

      if(err)
      {
        res.json({success: false, msg:'Failed to fetch user data', error: err});
      }

      else
      {

        if( rows[0] == null )
            res.json({success: false, msg:'No data'});

        res.json({success: true, result: rows});
      }

    });

});



module.exports = router;
