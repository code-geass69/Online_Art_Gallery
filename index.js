const express = require('express');
const path = require('path');
// const connectDB = require('./config/db');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views/pages'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
