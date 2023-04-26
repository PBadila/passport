'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderBaskets', [
      { order_id: 1, basket_id: 1 },
      { order_id: 2, basket_id: 2 },
      { order_id: 3, basket_id: 3 },
      { order_id: 4, basket_id: 4 },
      { order_id: 5, basket_id: 5 },
      { order_id: 6, basket_id: 1 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderBaskets', null, {});
  },
};