'use strict';
//const { SpotImages } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        imageId: 1,
        spotId: 1,
        url: "/images/01_0.webp",
        preview: true
      },
      {
        imageId: 2,
        spotId: 2,
        url: "/images/02_0.webp",
        preview: true
      },
      {
        imageId: 3,
        spotId: 3,
        url: "/images/03_0.webp",
        preview: true
      },
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, options);
  }
};

