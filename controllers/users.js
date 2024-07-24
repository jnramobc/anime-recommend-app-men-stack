const express = require('express');
const router = express.Router();
const User = require('../models/user');

  // Search Route
  router.get('/search', async (req, res) => {
    try {
      const searchQuery = req.query.username;
      const users = await User.find({ username: new RegExp(searchQuery, 'i') });
      res.render('users/index.ejs', { users });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


// Index Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Show Route to get a specific user's anime list
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.render('users/show.ejs', { user });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });



module.exports = router;
