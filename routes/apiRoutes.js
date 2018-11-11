var db = require("../models");
var dpla = require('dpla')('291cf4b916773e5304769e458b383d8f')

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // TEST ROUTE
  app.get("/api/test/:query", function (req, res) {
    dpla({
      uri: '/items',
      search: {
        q: req.params.query,
        'sort_by': 'isPartOf.name',
      }
    }, function (err, results) {
      res.json(results)
    });
  });
};