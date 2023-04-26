'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('BasketItems', [
      { basket_id: 1, item_id: 1 },
      { basket_id: 1, item_id: 2 },
      { basket_id: 1, item_id: 3 },
      { basket_id: 2, item_id: 4 },
      { basket_id: 2, item_id: 5 },
      { basket_id: 2, item_id: 6 },
      { basket_id: 3, item_id: 7 },
      { basket_id: 3, item_id: 8 },
      { basket_id: 3, item_id: 9 },
      { basket_id: 4, item_id: 10 },
      { basket_id: 4, item_id: 11 },
      { basket_id: 4, item_id: 12 },
      { basket_id: 5, item_id: 13 },
      { basket_id: 5, item_id: 14 },
      { basket_id: 5, item_id: 15 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BasketItems', null, {});
  },
};