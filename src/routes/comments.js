const express = require('express');
const router = express.Router();
const mySql = require('../database.js');
const Comment = require('../models/comment');
const passport = require('passport');


//router.post('/insert', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    router.post('/insert', (req, res, next) => {
    
    // add a class model here, right now skipping
       
        Comment.insert(req.body, (err, rows) =>
        {
            console.log(err);
    
        // console.log(err);
          if(err){
            return res.json({success: false, msg:'Failed to insert  comment', error:err});
          } else {
            return res.json({success: true, msg:'Comment inserted'});
          }
        });
    
    });


router.get('/getAll', (req, res, next) => {


        Comment.getAllComments(req.query.id, (err, rows) => 
        {
    
            if(err){
                res.json({success: false, msg:'Failed to fetch comment data', error: err});
            }
    
            else
            {
                res.json({success: true,  result: rows});
    
            }
    
        });
    
    
    });

module.exports = router;