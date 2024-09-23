'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            // will define associations here when all tables have been completed
        }
    }


    Review.init({
        spotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Spots', key: 'id' }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { mode: 'Users', key: 'id' }
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }

    });
    return Review;

};
