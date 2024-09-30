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
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        imageId: {
          type: DataTypes.INTEGER,
          references: { model: 'ReviewImages', key: 'id' },
          allowNull: false
        },
          reviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
              model: 'Reviews',
              key: 'id'
            }
          },
          url: {
            type: DataTypes.STRING,
            allowNull: false
          }
        }, {
          sequelize,
          modelName: 'ReviewImages'
          // tableName: 'review_images'
        });

        return ReviewImages;
};
