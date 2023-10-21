// routes/photos.js (updated)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/photo');
const checkAdmin = require('../middleware/checkAdmin'); // Import the admin authorization middleware

// ...

// Route to show the photo upload form
router.get('/upload', checkAdmin, (req, res) => {
  res.render('upload.ejs'); // Render the form for uploading photos
});

// Route to handle photo uploads
// router.post('/upload', checkAdmin, upload.single('image'), (req, res) => {
//   // ...
// });

// ...

module.exports = router;
