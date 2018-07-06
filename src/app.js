const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mySql = require('mySql');
const http = require('http');
const app = express();
const comments = require('./routes/comments');
const category = require('./routes/categories');
const users = require('./routes/users');
const posts = require('./routes/posts');
const helpers = require('./routes/helpers');
const threads = require('./routes/threads');
const img = require('./routes/img');


// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

// Set Static Folder

app.use(express.static('src'));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/posts', posts);
app.use('/helper', helpers);
app.use('/thread', threads);
app.use('/comment', comments);
app.use('/img',img);
app.use('/categories', category);



var server = require('http').Server(app);
var io = require('socket.io')(server, { wsEngine: 'ws' });
var io_logics = require('./io_logic')(io);



server.listen(port, () => {
  console.log("Listening on port " + port);
});


// Start Server
/*app.listen(port, () => {
  console.log('Server started on port '+port);
});*/
