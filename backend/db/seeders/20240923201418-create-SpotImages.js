'use strict';
const { SpotImages } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImages.bulkCreate([
      {
        spotId: '12',
        url: 'google.com'
      },
      {
        spotId: '123',
        url: 'bing.com'
      },
      {
        spotId: '1234',
        url: 'youtube.com'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['12', '123', '1234'] }
    }, {});
  }
};
