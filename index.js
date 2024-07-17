const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Contact = require('./models/Contact');
const Admin = require('./models/admin');
const User = require('./models/User');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');


const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Online-Art-Gallery', {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

const firebaseConfig = {
  apiKey: "AIzaSyDO5FdlnDW-PqXSrBpX_tVho_gBYEWFRFo",
  authDomain: "art-gallery-2003.firebaseapp.com",
  projectId: "art-gallery-2003",
  storageBucket: "art-gallery-2003.appspot.com",
  messagingSenderId: "503377346450",
  apppId: "1:503377346450:web:c7fd20c9f19b1aab87cb4b"
};

const appp = initializeApp(firebaseConfig);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();
    res.status(200).send('Contact information saved successfully');
  } catch (error) {
    res.status(500).send('Error saving contact information');
  }
});

app.get('/canvas', (req, res) => {
  res.render('utils/canvas');
});
app.get('/anime', (req, res) => {
  res.render('utils/anime');
});
app.get('/sketch', (req, res) => {
  res.render('utils/sketch');
});
app.get('/doodles', (req, res) => {
  res.render('utils/doodles');
});
app.get('/celebs', (req, res) => {
  res.render('utils/celebs');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, email } = req.body;

  try {
    // Create a new user document
    const newUser = new User({
      username,
      email
    });

    // Save the user to the database
    await newUser.save();

    res.render('home')
  } catch (error) {
    // console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/admin/login', (req, res) => {
  res.render('admin');
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    res.redirect('/dashboard'); // Redirect to the home page if credentials match
  } else {
    res.render('admin', { error: 'Invalid username or password. Please try again.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
