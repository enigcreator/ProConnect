const express = require ('express');
const router = express.Router();
const Category = require('../models/category');
const passport = require('passport');


router.get('/getAll', (req, res, next) => {

Category.getAll(req.query, (err, rows) => {


    if(err)
    {
        res.json({success: false});
        
    }
    else
    {
        res.json({success: true, result: rows});
    }



});

});


router.get('/getTags', (req, res, next) => {

    Category.getTags(req.query.id, (err, rows) => {
    

    
        if(err || isEmptyObject(rows))
        {
            res.json({success: false});
            
        }
        else
        {
            res.json({success: true, result: rows});
        }
    
    
    
    });
    
});

router.get('/getThreads', (req, res, next) => {

    Category.getThreads(req.query.id, (err, rows) => {
        
        
            if(err || isEmptyObject(rows))
            {
                res.json({success: false});
                
            }
            else
            {
                res.json({success: true, result: rows});
            }
        
        
        
     });
        
 });


 function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
module.exports = router;