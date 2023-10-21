// middleware/checkAdmin.js
module.exports = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next(); // User is an admin, allow access
    } else {
      res.redirect('/login'); // User is not an admin, redirect to login page or handle the error as needed
    }
  };
  