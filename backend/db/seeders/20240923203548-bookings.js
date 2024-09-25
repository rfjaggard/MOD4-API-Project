'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: "11/19/21",
        endDate: "11/20/21"
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "12/19/21",
        endDate: "12/20/21",
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "12/01/25",
        endDate: "12/10/25",
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "12/20/25",
        endDate: "12/26/25",
      }
    ], options);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2] }
    }, options);
  }
};
