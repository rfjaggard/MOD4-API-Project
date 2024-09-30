'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
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

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    }, options);
  }
};