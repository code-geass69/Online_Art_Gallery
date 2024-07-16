const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');
const Admin = require('./models/admin');
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

// Create the default admin user if it does not exist
async function createDefaultAdmin() {
  try {
    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      const newAdmin = new Admin({ username: 'admin', password: 'admin' });
      await newAdmin.save();
      console.log('Default admin user created');
    } else {
      console.log('Default admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin user', error);
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyDO5FdlnDW-PqXSrBpX_tVho_gBYEWFRFo",
  authDomain: "art-gallery-2003.firebaseapp.com",
  projectId: "art-gallery-2003",
  storageBucket: "art-gallery-2003.appspot.com",
  messagingSenderId: "503377346450",
  apppId: "1:503377346450:web:c7fd20c9f19b1aab87cb4b"
};

// Initialize Firebase
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

app.get('/admin/login', (req, res) => {
  res.render('admin');
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      res.redirect('/home');
    } else {
      res.render('admin', { error: 'Invalid username or password. Please try again.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.render('admin', { error: 'An error occurred. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
