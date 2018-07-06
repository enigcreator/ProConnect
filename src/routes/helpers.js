const express = require('express');
const router = express.Router();
const mySql = require('../database.js');
const helper = require ('../models/helper');



router.get('/locations', (req, res, next) => {
    
    
        helper.getAllLocations((err, rows) => {

        if(err)
        {
            res.json({success: false, msg:'Failed to get locations', error: err.code});
        }

        else
        {
            res.json({success: true, data: rows});
        }

    });



});

router.get('/getTag', (req, res, next) => {

    helper.getTag(req.query.id, (err, rows) =>{

        if(err)
        {
            res.json({success: false});
        }
        else
        {
            res.json({success: true, result: rows});
        }

    });

})





router.get('/getAllChat', (req, res, next) => {


    helper.getAllChat(req.query, (err, rows) => {

        if(err)
        {
            console.log(err);
            res.json({success: false, result: err});
        }
        else
        {
            res.json({success: true, result: rows});
        }
    });


});



module.exports = router;