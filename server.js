const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const authController = require('./controllers/auth.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const animeController = require('./controllers/animes.js');
const usersController = require('./controllers/users');



const port = process.env.PORT ? process.env.PORT : '3000';

const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);
app.use('/users', usersController);

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their anime index
    res.redirect(`/users/${req.session.user._id}/animes`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs');
  }
});

app.use('/auth', authController);
app.use(isSignedIn); // use isSignedIn middleware here
app.use('/users/:userId/animes', animeController);

app.listen(port, () => {
 
});

