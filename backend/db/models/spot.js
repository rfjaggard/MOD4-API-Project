'use strict';

const { Model, DataTypes } = require('sequelize');
const SpotImages = require('./SpotImages');

module.exports = (sequelize, DataTypes) => {
    class Spots extends Model {
        static associate(models) {
            Spots.hasMany(models.SpotImages, {foreignKey: "spotId"});
            Spots.belongsTo(models.User, { as: 'Owner' });// will define associations here when all tables have been completed
        }
    }

    Spots.init({
        ownerId: {
            type:DataTypes.INTEGER,
            allowNull: false,
            references: { mode: 'Users', key: 'id'}
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },
        lng: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Spot',
    });

    return Spots;

};
