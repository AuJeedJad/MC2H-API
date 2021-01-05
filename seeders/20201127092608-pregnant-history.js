'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pregnant_histories', [
      {
        motherId: '1',
        deliverDate: '2018-10-03',
        birthAtGa: '38',
        deliverMethod: 'คลอดธรรมชาติ',
        childWeight: '3700',
        childGender: 'ชาย',
        birthPlace: 'โรงพยาบาลกรุงเทพ',
        complication: '-',
        childStatus: 'มีชีวิตอยู่',
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
