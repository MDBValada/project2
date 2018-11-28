// Creating User model
module.exports = function (sequelize, DataTypes) {
   var Favorite = sequelize.define("Favorite", {
      // Attributes
      imgURL: {
         type: DataTypes.STRING,
      },
      title: {
         type: DataTypes.STRING,
      }
   });

   Favorite.associate = function (models) {
      // Associating Users with Favorited landmarks
      Favorite.belongsTo(models.User);
   };

   return Favorite;
};