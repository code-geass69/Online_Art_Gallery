require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const Art = require('./models/Art');


const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const homeRoutes = require('./routes/home');
const artRoutes = require('./routes/art');
const adminRoutes = require('./routes/admin');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const uri = process.env.MONGO_URI;
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

mongoose.connect(uri, clientOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).send('Database connection is not established');
  }
  next();
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
const appp = initializeApp(firebaseConfig);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRoutes);
app.use('/', artRoutes);
app.use('/', adminRoutes);


app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.post('/dashboard/add', async (req, res) => {
  const { title, description, category, image, instagramUrl } = req.body;

  const newArt = new Art({
    title,
    description,
    category,
    imageUrl: image,
    instagramUrl
  });

  try {
    await newArt.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error saving artwork details to database.');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
