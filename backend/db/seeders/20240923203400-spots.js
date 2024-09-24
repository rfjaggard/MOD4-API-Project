'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "180 Bro Ave",
        city: "Lakeside",
        state: "California",
        country: "United States",
        lat: 88.5575,
        lng: -122.1809,
        name: "Name0",
        description: "desc0",
        price: 189
      },
          {
            ownerId: 2,
            address: "181 Homie St",
            city: "Rievrside",
            state: "Texas",
            country: "United States",
            lat: 20.0019,
            lng: -112.4730,
            name: "Name1",
            description: "desc1",
            price: 420
          },
          {
            ownerId: 3,
            address: "456 Elmo St",
            city: "Lake Hamilton",
            state: "Arkansas",
            country: "United States",
            lat: 11.7645,
            lng: 25.4730,
            name: "Name2",
            description: "desc2",
            price: 471
          },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['180 Bro Ave', '181 Homie St', '456 Elmo St'] }
    }, {});
  }
};
