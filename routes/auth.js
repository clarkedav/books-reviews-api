const express = require('express');
const passport = require('passport');
const router = express.Router();

// Starts the GitHub OAuth flow
router.get('/login', passport.authenticate('github'));

// GitHub redirects here after the user approves
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// Shows whether you're logged in and as who (handy to see in the video)
router.get('/profile', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.status(200).json({
      loggedIn: true,
      username: req.user.username,
      displayName: req.user.displayName
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
