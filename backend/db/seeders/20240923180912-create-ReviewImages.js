'use strict';
const { ReviewImages } = require('../models');
//const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImages.bulkCreate([
      {
        reviewId: '12',
        url: 'google.com'
      },
      {
        reviewId: '123',
        url: 'bing.com'
      },
      {
        reviewId: '1234',
        url: 'youtube.com'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: ['12', '123', '1234'] }
    }, {});
  }
};
