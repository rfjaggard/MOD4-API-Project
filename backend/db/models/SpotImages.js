'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImages extends Model {
    static associate(models) {
      // define association here
    }
  }

  SpotImages.init(
    {
        spotId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        url: {
            type: DataTypes.STRING,
            allowNull: false
          },
          preview: {
            type: DataTypes.STRING,
            allowNull: false
          }
        }, {
          sequelize,
          modelName: 'SpotImages',
          tableName: 'spot_images'
        });
        
        return SpotImages;
};
