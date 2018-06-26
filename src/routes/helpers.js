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









module.exports = router;