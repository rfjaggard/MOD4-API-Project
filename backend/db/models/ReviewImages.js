'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImages extends Model {
    static associate(models) {
      ReviewImages.belongsTo(models.Reviews, { foreignKey: "reviewId" });
    }
  }

  ReviewImages.init(
    {
        reviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          url: {
            type: DataTypes.STRING,
            allowNull: false
          }
        }, {
          sequelize,
          modelName: 'ReviewImages',
          tableName: 'review_images'
        });
        
        return ReviewImages;
};
