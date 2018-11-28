// Require authentication middleware.
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load login/signup view.
  app.get("/", function (req, res) {
     // If user already has an account, send them to the search.handlebars view.
     if (req.user) {
      res.redirect("/search");
    }
    res.render("login", {
      title: 'Login',
      style: 'login.css'
    });
  });

  // isAuthenticated middleware implemented for this route.
  // If a user who is not logged in tries to access this route 
  // they will be redirected to the login/signup view.
  app.get("/login", isAuthenticated, function (req, res) {
    res.redirect("/");
  });

  // Load search.handlebars view.
  app.get("/search", function (req, res) {
    res.render("search", {
      title: 'Search Landmarks',
      style: 'search.css',
    });
  });

  // Load search.handlebars view and allow query request.
  app.get("/search/:query", function (req, res) {
    res.render("search", {
      title: 'Search Landmarks',
      style: 'search.css',
    });
  });

  // Load favorites.handlebars view with user favorites.
  app.get("/favorites", function (req, res) {
    res.render("landmarks", {
      title: 'Saved Landmarks',
      style: 'landmarks.css',
    });
  });

  // Render 404 page for any unmatched routes.
  app.get("*", function (req, res) {
    res.render("404");
  });
};