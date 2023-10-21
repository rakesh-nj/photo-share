const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

// ... (other configurations)

// Use express session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure random key
    resave: false,
    saveUninitialized: false,
  }));
// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Use connect-flash for displaying flash messages
app.use(flash());

const User = require('./models/user'); // Assuming you have a User model
const Photo = require('./models/photo'); // Assuming you have a Photo model


// Import and use the photos routes
const photosRoutes = require('./routes/photos');
app.use('/photos', photosRoutes);

// ... (other routes and middleware)

// ... Set up Passport.js serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
});

// Set up the LocalStrategy for authenticating users
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
      if (user.password !== password) { return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
}));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
