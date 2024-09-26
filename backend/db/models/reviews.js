'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.User, { foreignKey: "userId" });
            Review.belongsTo(models.Spot, { foreignKey: "spotId" });
            Review.hasMany(models.ReviewImages, { foreignKey: "reviewId" });
        }
    }


    Review.init({
        spotId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        review: DataTypes.STRING,
        stars: DataTypes.INTEGER
      }, {
        sequelize,
        modelName: 'Reviews',
      });
      return Review;
    };
