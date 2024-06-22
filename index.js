const express = require('express');
const path = require('path');
// const connectDB = require('./config/db');

const app = express();
const port = 3000;

// Connect to database
// connectDB();

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Set up public folder for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the index view
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
