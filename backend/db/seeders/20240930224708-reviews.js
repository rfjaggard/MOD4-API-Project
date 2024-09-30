'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "Great.",
        stars: 5.0
      },
      {
        userId: 2,
        spotId: 1,
        review: "Very unique!",
        stars: 5.0
      },
      {
        userId: 3,
        spotId: 1,
        review: "Excellent.",
        stars: 5.0
      },
      {
        userId: 1,
        spotId: 2,
        review: "The property was beautiful.",
        stars: 5
      },
      {
        userId: 1,
        spotId: 3,
        review: "Absolutely gorgeous view and stay!",
        stars: 5.0
      },
      {
        userId: 2,
        spotId: 3,
        review: "This house is stunning. Perfect location. Will definitely recommend to friends and want to return ourselves.",
        stars: 5.0
      },
      {
        userId: 3,
        spotId: 3,
        review: "We enjoyed this gorgeous spot. Can't wait to visit again in the summer.",
        stars: 5.0
      },
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["Bad spot!", "Good spot!"] }
    }, options);
  }
};
