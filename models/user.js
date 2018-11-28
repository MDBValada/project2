// Require bcrypt for password hashing
var bcrypt = require("bcrypt-nodejs");

// Creating User model
module.exports = function (sequelize, DataTypes) {
   var User = sequelize.define("User", {
      // Attributes
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: true
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      }
   });

   // Custom method for User model
   // This will check if an unhashed password entered by the 
   // user can be compared to the hashed password stored in the database.
   User.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
   };
   // Hooks are automatic methods that run during various phases of the User Model lifecycle
   // In this case, before a User is created, we will automatically hash their password
   User.hook("beforeCreate", function (user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
   });

   User.associate = function(models) {
      // Associating Users with Favorited landmarks
      User.hasMany(models.Favorite)
   };

   return User;
};