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
    await queryInterface.bulkInsert('review_images', [
      {
        url: 'http://example.com/image1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'http://example.com/image2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('review_images', null, {});
  }
};
