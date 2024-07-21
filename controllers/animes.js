// controllers/anime.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


// Index Route
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('animes/index.ejs', { animes: currentUser.animes });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// New Route
router.get('/new', async (req, res) => {
    res.render('animes/new.ejs');
  });
 
  
// Create Route
router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);

    // Convert the 'recommended' checkbox value to boolean
    req.body.recommended = req.body.recommended === 'on';

    // Push req.body (the new form data object) to the animes array of the current user
    currentUser.animes.push(req.body);

    // Save changes to the user
    await currentUser.save();

    // Redirect back to the animes index view
    res.redirect(`/users/${currentUser._id}/animes`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
