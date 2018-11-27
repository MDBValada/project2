// Creating Favorite model
module.exports = function (sequelize, DataTypes) {
   var Favorite = sequelize.define("Favorite", {
      // Attributes
      image: {
         type: Sequelize.TEXT,
         get: function () {
            return JSON.parse(this.getDataValue('value'));
         },
         set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
         },
      },
      title: {
         type: Sequelize.TEXT,
         get: function () {
            return JSON.parse(this.getDataValue('value'));
         },
         set: function (value) {
            this.setDataValue('value', JSON.stringify(value));
         },
      },
   }, {
      defaultScope: {
         where: {
            active: true
         }
      },
      scopes: {
         deleted: {
            where: {
               deleted: true
            }
         },
         activeUsers: {
            include: [
               { model: User.scope('active')}
            ]
         },
         // random: function () {
         //    return {
         //       where: {
         //          someNumber: Math.random()
         //       }
         //    }
         // },
         // accessLevel: function (value) {
         //    return {
         //       where: {
         //          accessLevel: {
         //             [Op.gte]: value
         //          }
         //       }
         //    }
         // }
      }
   });

   Favorite.associate = function(models) {
      // Favorited landmarks should belong to a specific User
      // A landmark can't be favorited without a User due to the foreign key constraint
      Favorite.belongsTo(models.User)
   };

   return Favorite;
};