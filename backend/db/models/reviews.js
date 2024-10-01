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
        Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        spotId: {
          type: DataTypes.INTEGER, 
          allowNull: false,
          references: {
              model: 'Spot',
              key: 'id'
          }
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'User',
              key: 'id'
          }
        },
        review: {
          type: DataTypes.STRING,
        },
        stars: {
          type: DataTypes.INTEGER
        },
      }, {
        sequelize,
        modelName: 'Reviews',
      });
      return Review;
    };
