const express = require('express');
const path = require('path');
// const connectDB = require('./config/db');

const app = express();
const port = 3000;

// Connect to database
// connectDB();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
