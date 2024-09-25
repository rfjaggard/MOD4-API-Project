'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
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
        userId: 4,
        spotId: 1,
        review: "Great location!",
        stars: 5.0
      },
      {
        userId: 5,
        spotId: 1,
        review: "The views were beautiful.",
        stars: 5.0
      },
      {
        userId: 6,
        spotId: 1,
        review: "We absolutely love the view.",
        stars: 5.0
      },
      {
        userId: 7,
        spotId: 1,
        review: "We really enjoyed staying here! Can't wait to come back!",
        stars: 5.0
      },
      {
        userId: 8,
        spotId: 1,
        review: "This place is amazing!! Can not wait to return!",
        stars: 4
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

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["Bad spot!", "Good spot!"] }
    }, options);
  }
};
