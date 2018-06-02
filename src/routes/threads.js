const express = require('express');
const router = express.Router();
const mySql = require('../database.js');
const Post = require('../models/post');
const passport = require('passport');
const Thread = require('../models/thread');
const Promise = require('promise')

//router.post('/insert', passport.authenticate('jwt', {session:false}), (req, res, next) => {
router.post('/insert', (req, res, next) => {

    let thread = new Thread.threadModel;
    thread.brief = req.body.brief;
    thread.cat_id = req.body.category_id;
    thread.tags = req.body.tags;
    thread.op_post = null;

    
    Thread.insert(thread, (err, rows) => {

        if(err){
            return res.json({success: false, msg:'Failed to insert thread', error: err});
          } else {
            return res.json({success: true, msg:'Thread inserted',insertId:rows});
          }
        });

    });

//router.post('/updateOp', passport.authenticate('jwt', {session:false}), (req, res, next) => {
router.post('/updateOp', (req, res, next) => {
    let post_id = req.body.id;
    let thread_id = req.body.thread;
    console.log("I am thread here to update OP got thread id" ,req.body.thread);
    console.log("I am thread here to update OP got postt id", req.body.id);
    Thread.updateOp({id: post_id, thread: thread_id}, (err, rows) => {

        if(err){
            return res.json({success: false, msg:'Failed to update thread', error: err.code});
          } else {
            return res.json({success: true, msg:'Thread update'});
          }

    });

});


router.get('/getThreadsByTime', (req, res, next) => {


    Thread.getByTime(req.query.count, (err, rows) => {

        if(err){
            return res.json({success: false, msg:'An error occured', error: err});
          } else {
            return res.json({success: true, result: rows});
          }
        

    });


});

router.get('/getThreadsByViews', (req, res, next) => {


    Thread.getByViews(req.query.count, (err, rows) => {

        if(err){
            return res.json({success: false, msg:'An error occured', error: err});
          } else {
            return res.json({success: true, result: rows});
          }
        

    });


});


router.get('/getThreadsByAnswers', (req, res, next) => {


    Thread.getByAnswers(req.query.count, (err, rows) => {

        if(err){
            return res.json({success: false, msg:'An error occured', error: err});
          } else {
            return res.json({success: true, result: rows});
          }
        

    });


});


router.get('/getNotifications', (req, res, next) => {


    Thread.getNotifications(req.query.id, (err, rows)=>{

        if(err){
            res.json({success: false, msg:'Failed to fetch notifications data', error: err});
        }

        else
        {
            res.json({success: true, result: rows});
        }

    })

});


router.get('/getThreadPostIds', (req, res, next) => {

    Thread.getThreadPostIds(req.query.id, (err, rows) => {

        if(err){
            res.json({success: false, msg:'Failed to fetch thread data', error: err});
        }

        else
        {
            res.json({success: true, result: rows});
        }
    });


});
router.get('/getThreadById', (req, res, next) => {


    Thread.getThreadById(req.query.id, (err, rows) => 
    {

        if(err){
            res.json({success: false, msg:'Failed to fetch thread data', error: err});
        }

        else
        {
            res.json({success: true, result: rows});
        }


    });
});

router.get('/getAllPosts', (req, res, next) => {

    console.log("all called");

    Thread.getAllPosts(req.query.id, (err, rows) => 
    {

        if(err){
            res.json({success: false, msg:'Failed to fetch thread data', error: err});
        }

        else
        {
            res.json({success: true, result: rows});
        }


    });
});


router.get('/getAllTags', (req, res, next) => {


    Thread.getAllTags(req.query.id, (err, rows) => 
    {

        if(err){
            res.json({success: false, msg:'Failed to fetch tags data', error: err});
        }

        else
        {
            res.json({success: true, result: rows});
        }


    });
});
module.exports = router;