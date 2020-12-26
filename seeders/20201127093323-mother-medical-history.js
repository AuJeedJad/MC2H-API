'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mother_medical_histories', [
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
      {
        motherId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mother_medical_histories', null, {});
  },
};
