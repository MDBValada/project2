var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        title: 'Home Page',
        style: 'styles.css',
        examples: dbExamples
      });
    });
  });

  // Load saved-landmarks page
  app.get("/search/:query", function (req, res) {
    res.render("landmarks", {
      title: 'My Landmarks',
      style: 'landmarks.css',
    });
  });


  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};