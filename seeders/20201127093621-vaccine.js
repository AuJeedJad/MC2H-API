'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vaccines', [
      {
        curPregId: '1',
        tetanusCountBefore: '1',
        lastTetanusHxDate: '2019-01-12',
        tetausDosePefered: '3Does',
        firstTetanusDate: '2019-11-12',
        firstTDPType: 'TT',
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
