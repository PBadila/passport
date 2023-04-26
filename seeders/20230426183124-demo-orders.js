'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      { user_id: 1, ordered_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, ordered_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, ordered_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 4, ordered_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 5, ordered_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { user_id: 6, ordered_date: new Date(), createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};