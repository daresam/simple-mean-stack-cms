const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const users = require('./controllers/users');
const posts = require('./controllers/posts');
const config = require('./config/database');

// Connect to DB
mongoose.connect(config.database);

// On Connected
mongoose.connection.on('connected', () => {
    console.log(`connedted to database: ${config.database}`);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log(`Connection failed Error: ${err}`);
});

// Declaring app varialble
const app = express();

// Declaring Port
const port = process.env.PORT || 3000;

// Declaring Middleware Cors
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Serve Static file
app.use(express.static(path.join(__dirname, 'public'))) ;



// Routing all users
app.use('/users', users);

// Routong all Posts
app.use('/posts', posts);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  
// Start Server
app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
} )