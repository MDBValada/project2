var db = require("../models");

module.exports = function (app) {
  // Load login/signup page
  app.get("/", function (req, res) {
    res.render("login", {
      title: 'Login',
      style: 'login.css'
    });
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


 

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};