const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');



const app = express();
const port = 3000;
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/Online-Art-Gallery')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

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
})

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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
