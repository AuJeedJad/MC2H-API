'use strict';
const inactiveDate = new Date();
inactiveDate.setDate(inactiveDate.getDate() + 330);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('current_pregnancies', [
      {
        motherId: '1',
        inactiveDate: inactiveDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        motherId: '2',
        inactiveDate: inactiveDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('current_pregnancies', null, {});
  },
};
