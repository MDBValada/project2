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

  // Data Transfer Object. Parse specific fields into object.
  class LocationObject {
    constructor(name, image) {
      this.name = name;
      this.image = image;
    }
  };

  // TEST ROUTE
  app.get("/api/test/:query", function (req, res) {
    dpla({
      uri: '/items',
      search: {
        q: req.params.query,
        'sort_by': 'isPartOf.name',
      }
    }, function (err, results) {
      let locationObjects = [];
      results.docs.forEach(jsonObj => {
        let name = jsonObj.sourceResource.title;
        let image = jsonObj.object;
        locationObjects.push(new LocationObject(name, image))
      });
      
      res.json(locationObjects);
    });
  });

  app.get("/search/:query", function (req, res) {
    dpla({
      uri: '/items',
      search: {
        q: req.params.query,
        'sort_by': 'isPartOf.name',
      } 
    },function (err, results) {
      //callback function for the dpla cacallll
      // create an array to store all of your data objects that we will be mining from the datat we got in
      let locationObjects = [];
      console.log(results.docs.length);
      // loop throuhg the results and get out the name and the image
      for (let i = 0; i < results.docs.length; i++) {
        const jsonObj = results.docs[i];
        let name = jsonObj.sourceResource.title;
        let image = jsonObj.object;
        // using the name and the image we got out of the results we create a new location object, and push it into the array of location objects
        locationObjects.push(new LocationObject(name, image));
        // if we are at the end of the list of results call the res.render function to throw the new data into our handlebars page
        if(i == results.docs.length -1 ){
          res.render("landmarks", { locationObjects: locationObjects });
        }
      }
    });
  });


}