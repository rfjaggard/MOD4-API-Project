'use strict';

const { Model, Validator, INTEGER } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImages extends Model {
    static associate(models) {
    SpotImages.belongsTo(models.Spots, { foreignKey: "spotId"});
    SpotImages.hasMany(models.SpotImages, {foreignKey: "imageId"});
    }
  }



  SpotImages.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        imageId: {
          type: DataTypes.INTEGER,
          // allowNull: false
        },
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Spots',
                key: 'id'
            }

          },
        url: {
            type: DataTypes.STRING,
            allowNull: false
          },
          preview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
          }
        }, {
          sequelize,
          modelName: 'SpotImages'
          // tableName: 'spot_images'
        });

        return SpotImages;
};
