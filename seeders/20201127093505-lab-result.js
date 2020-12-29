'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lab_results', [
      {
        curPregId: '1',
        role: 'mother',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        curPregId: '1',
        role: 'mother',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        curPregId: '1',
        role: 'father',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        curPregId: '2',
        role: 'mother',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        curPregId: '2',
        role: 'father',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lab_results', null, {});
  },
};
