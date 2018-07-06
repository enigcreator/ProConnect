var express = require('express');
//require the express router
var router = express.Router();
var crypto = require('crypto');
//require multer for the file uploads
const mime = require ("mime");
// set the directory for the uploads to the uploaded to

/* GET home page. */

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/assets/images/uploads')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
  });
  var upload = multer({ storage: storage }).single('photo');

//our file upload function.
router.post('/', function (req, res, next) {
     var path1 = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path1 = req.file.path;
    
        return res.json({path:path1}); 
  });     
});


module.exports = router;