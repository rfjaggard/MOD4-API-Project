'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            // will define associations here when all tables have been completed

        }
    }

    Booking.init({
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Spots', key: 'id' }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' }
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Booking',
    })
    return Booking;
};
