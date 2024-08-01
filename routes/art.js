const express = require('express');
const router = express.Router();
const Art = require('../models/Art');

router.get('/canvas', async (req, res) => {
  try {
    const artworks = await Art.find({ category: 'canvas' });
    res.render('utils/canvas', { artworks });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/anime', async (req, res) => {
  try {
    // Fetch artworks of category 'anime' from the database
    const artworks = await Art.find({ category: 'anime' });

    // Render the 'anime' view and pass the fetched artworks
    res.render('utils/anime', { artworks });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/sketch', async (req, res) => {
  try {
    const artworks = await Art.find({ category: 'sketch' });
    res.render('utils/sketch', { artworks });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/doodles', async (req, res) => {
  try {
    const artworks = await Art.find({ category: 'doodle' });
    res.render('utils/doodles', { artworks });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/celebs', async (req, res) => {
  try {
    const artworks = await Art.find({ category: 'celebs' });
    res.render('utils/celebs', { artworks });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
