var db = require("../models");
var passport = require("../config/passport");
var dpla = require('dpla')('291cf4b916773e5304769e458b383d8f')

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send to the members page, otherwise send user an error.
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/members");
  });

  
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });


  // Data Transfer Object. Parse specific fields into object.
  class LocationObject {
    constructor(name, image) {
      this.name = name;
      this.image = image;
    }
  };

  // Create a new example
  app.post("/search", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Search new landmarks
  app.get("/search/:query", function (req, res) {
    dpla({
      uri: '/items',
      search: {
        q: req.params.query,
        'sort_by': 'isPartOf.name',
      }
    }, function (err, results) {
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
        if (i == results.docs.length - 1) {
          res.render("search", {
            title: 'Search Landmarks',
            style: 'search.css',
            locationObjects: locationObjects
          });
        }
      }
    });
  });


}