'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Baskets', [
      { name: 'Vitality Boost', price: 10.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Energy Pack', price: 12.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Immunity Boost', price: 15.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mindful Munchies', price: 9.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Green Goodness', price: 14.00, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Baskets', null, {});
  },
};