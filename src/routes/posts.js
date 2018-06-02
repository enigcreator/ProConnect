const express = require('express');
const router = express.Router();
const mySql = require('../database.js');
const Post = require('../models/post');
const passport = require('passport');

//router.post('/insert', passport.authenticate('jwt', {session:false}), (req, res, next) => {
router.post('/insert', (req, res, next) => {
    

    newPost = new Post.postModel();
    newPost.details = req.body.details;
    newPost.author = req.body.author;


    if(req.body.thread >0 && req.body.thread<999)
    newPost.thread = req.body.thread;

   console.log("I am post, got thread :", req.body.thread); 

    Post.insert(newPost, (err, rows) =>
    {

    // console.log(err);
      if(err){
        return res.json({success: false, msg:'Failed to insert a post', error: err});
      } else {
        return res.json({success: true, msg:'Post inserted', insertId:rows});
      }
    });

});


router.post('/insert_simple', (req, res, next) => {
    

    newPost = new Post.postModel();
    newPost.details = req.body.details;
    newPost.author = req.body.author;


    if(req.body.thread >0 && req.body.thread<999)
    newPost.thread = req.body.thread;

   console.log("I am post, got thread :", req.body.thread); 

    Post.insert_simple(newPost, (err, rows) =>
    {

    // console.log(err);
      if(err){
        return res.json({success: false, msg:'Failed to insert a post', error: err});
      } else {
        return res.json({success: true, msg:'Post inserted', insertId:rows});
      }
    });

});

router.get('/getPost', (req, res, next) => {


    Post.getPostbyId(req.query.id, (err, rows) => 
    {

        if(err){
            res.json({success: false, msg:'Failed to fetch post data', error: err.code});
        }

        else
        {
            res.json({success: true,  result: rows});

        }

    });


});

router.get('/getCommentIds', (req, res, next) => {


    Post.getCommentIds(req.query.id, (err, rows) => 
    {

        if(err){
            res.json({success: false, msg:'Failed to fetch comment Ids', error: err});
        }

        else
        {
            res.json({success: true,  result: rows});

        }

    });


});

module.exports = router;