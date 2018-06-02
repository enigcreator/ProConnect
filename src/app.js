const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mySql = require('mySql');
const http = require('http');
const app = express();
const comments = require('./routes/comments');
const users = require('./routes/users');
const posts = require('./routes/posts');
const helpers = require('./routes/helpers');
const threads = require('./routes/threads');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist/index')));

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


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

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
