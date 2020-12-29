'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pregnant_histories', [
      {
        motherId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        motherId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pregnant_histories', null, {});
  },
};
