'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vaccines', [
      {
        curPregId: '1',
      },
      {
        curPregId: '2',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vaccines', null, {});
  },
};
