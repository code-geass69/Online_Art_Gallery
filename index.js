const express = require('express');
const path = require('path');
// const connectDB = require('./config/db');

const app = express();
const port = 3000;

// Connect to database
// connectDB();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for view files
app.set('views', path.join(__dirname, 'views/pages'));

// Set the directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
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
