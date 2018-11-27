var path = require("path");

// Require middleware 
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");

module.exports = function (app) {
  // Load login/signup page
  app.get("/", function (req, res) {
     // If the user already has an account send them to the members search page
     if (req.user) {
      res.redirect("/search");
    }
    res.render("login", {
      title: 'Login',
      style: 'login.css'
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/login", isAuthenticated, function (req, res) {
    res.redirect("/");
  });

  
  // Load initial search page
  app.get("/search", function (req, res) {
    res.render("search", {
      title: 'Search Landmarks',
      style: 'search.css',
    });
  });

  // Load search page with location request
  app.get("/search/:query", function (req, res) {
    res.render("search", {
      title: 'Search Landmarks',
      style: 'search.css',
    });
  });

  // Load search page with location request
  app.get("/favorites", function (req, res) {
    res.render("landmarks", {
      title: 'Saved Landmarks',
      style: 'landmarks.css',
    });
  });



  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};