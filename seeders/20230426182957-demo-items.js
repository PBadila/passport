'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      { name: 'Carrot', price: 0.99, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tomato', price: 1.50, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Spinach', price: 3.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kale', price: 2.50, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Apple', price: 1.20, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Orange', price: 1.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Grapes', price: 2.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Strawberry', price: 2.50, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Basil', price: 1.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mint', price: 1.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Parsley', price: 1.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lettuce', price: 1.50, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cucumber', price: 1.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Broccoli', price: 2.00, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cauliflower', price: 2.50, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  },
};