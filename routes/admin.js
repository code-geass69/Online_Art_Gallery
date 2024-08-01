const express = require('express');
const router = express.Router();
const Admin = require('/Online_Art_Gallery/models/admin');

router.get('/admin/login', (req, res) => {
  res.render('admin', { error: null });
});

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    res.redirect('/dashboard');
  } else {
    res.render('admin', { error: 'Invalid username or password. Please try again.' });
  }
});

module.exports = router;
