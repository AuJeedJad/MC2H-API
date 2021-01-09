'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lab_results', [
      {
        curPregId: '1',
        date: new Date(),
        bloodGroup: 'b',
        hctHb: 'h',
        ofMcvMch: 'o',
        dcip: 'd',
        hbTyping: 'h',
        pcr: 'p',
        hepatitisBVirus: 'h',
        syphilis: 's',
        hiv: 'hiv',
        role: 'mother',
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
        curPregId: '1',
        bloodGroup: 'b',
        hctHb: 'h',
        ofMcvMch: 'o',
        dcip: 'd',
        hbTyping: 'h',
        pcr: 'p',
        hepatitisBVirus: 'h',
        syphilis: 's',
        hiv: 'hiv',
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
