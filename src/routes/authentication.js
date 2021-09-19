const express = require("express");
const router = express.Router();

const passport = require("passport");
const { isNotLoggedIn, isLoggedIn } = require('../lib/auth');

router.get("/signup", isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("signin");
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;
