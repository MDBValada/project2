var db = require("../models");
var passport = require("../config/passport");
var dpla = require('dpla')('291cf4b916773e5304769e458b383d8f')

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send to the search.handlebars view, otherwise send user an error.
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/search");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error.
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
    });
  });

  // Route for getting some data about our user to be used client side.
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object.
      res.json({});
    } else {
      // Otherwise send back the user's email and id.
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Data Transfer Object. Parse specific fields into object.
  class LocationObject {
    constructor(name, image) {
      this.name = name;
      this.image = image;
    }
  };

  // Route for new landmark search query using dpla api.
  app.get("/search/:query", function (req, res) {
    dpla({
      uri: '/items',
      search: {
        q: req.params.query,
        'sort_by': 'isPartOf.name',
      }
    }, function (err, results) {
      // Callback function for dpla. 
      // Store all returned data objects in array to mine specific data from with a for-loop later.
      let locationObjects = [];
      console.log(results.docs.length);
      // Loop through results and select out the name and the image.
      for (let i = 0; i < results.docs.length; i++) {
        const jsonObj = results.docs[i];
        let name = jsonObj.sourceResource.title;
        let image = jsonObj.object;
        // Using the name and image from the for-loop results, 
        // create a new location object and push it into the array of location objects.
        locationObjects.push(new LocationObject(name, image));
        // At the end of the list of results, call res.render function to send the new data into the search.handlebars view.
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

  app.post("/favorites", function (req, res) {
    console.log(req.body)
    // Create a post with the favorited image and title using req.body, then return the result using res.json.
    db.Favorite.create({
      imgURL: req.body.imgURL,
      title: req.body.title,
      UserId: req.user.id
    }).then(function (dbFavorite) {
      res.json(dbFavorite)
    })
  });

  // GET route for grabbing all of the favorited landmarks for the associated user,
  // else, render a blank favorites.handlebar view.
  app.get("/favorites/", function (req, res) {
    console.log(req.user);
    var query = {};
    if (req.user) {
      query.UserId = req.user.id;

      db.Favorite.findAll({
          where: query
        })
        .then(function (dbFavorites) {
          res.render("landmarks", {
            title: 'Saved Landmarks',
            style: 'landmarks.css',
            Favorite: dbFavorites
          });
        });
    } else {
      res.render("landmarks", {
        title: 'Saved Landmarks',
        style: 'landmarks.css',
        Favorite: []
      });
    }
  });

  // Route for logging user out. Redirects back to login/signup view.
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};