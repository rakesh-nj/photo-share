// models/Photo.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  image: String, // Store the image file name
  // You can add more fields like description, date, etc.
});

module.exports = mongoose.model('Photo', photoSchema);
