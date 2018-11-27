// Creating User model
module.exports = function (sequelize, DataTypes) {
   var Favorite = sequelize.define("Favorites", {
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