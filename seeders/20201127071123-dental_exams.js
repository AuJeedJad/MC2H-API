'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dental_exams', [
      {
        toothDecay: 3,
        gingivitis: true,
        calculus: true,
        other: 'แปรงฟันเยอะๆ',
        examBy: 'บอลลูน',
        createdAt: '2020-11-27',
      },
      {
        toothDecay: 1,
        gingivitis: false,
        calculus: false,
        other: 'ใช้ไหมขัดฟัน',
        examBy: 'ลูกโป่ง',
        createdAt: '2020-11-27',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dental_exams', null, {});
  },
};
