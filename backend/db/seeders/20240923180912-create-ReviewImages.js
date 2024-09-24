'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;  // define your schema in options object
// };
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: "image-for-review-1"
      },
      {
        reviewId: 2,
        url: "image-for-review-2"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2] }
    }, {});
  }
};
