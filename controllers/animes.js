const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Index Route
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('animes/index.ejs', { animes: currentUser.animes, user: req.session.user });
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
    const currentUser = await User.findById(req.session.user._id);

    req.body.recommended = req.body.recommended === 'on';

    currentUser.animes.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/animes`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete Route
router.delete('/:animeId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.animes.id(req.params.animeId).remove();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/animes`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit Route
router.get('/:animeId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const animeItem = currentUser.animes.id(req.params.animeId);
    res.render('animes/edit.ejs', { animeItem, userId: req.session.user._id });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Update Route
router.put('/:animeId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const animeItem = currentUser.animes.id(req.params.animeId);

    animeItem.title = req.body.title;
    animeItem.status = req.body.status;
    animeItem.recommended = req.body.recommended === 'on';

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/animes`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;
