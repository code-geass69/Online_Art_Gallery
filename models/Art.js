const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  instagramUrl: { type: String }
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;
