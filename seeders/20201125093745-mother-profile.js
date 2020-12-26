'use strict';
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mother_profiles', [
      {
        firstName: 'สุรชัย',
        lastName: 'แสงสว่าง',
        idCard: '2121000011111',
        password: bcryptjs.hashSync('2121000011111', salt),
        phoneNumber: '0871234567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'สุรชัยเองจ้า',
        lastName: 'ศรีสว่าง',
        idCard: '2121000018154',
        password: bcryptjs.hashSync('2121000018154', salt),
        phoneNumber: '0123434567',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'ชื่อหญิงตั้งครรภ์',
        lastName: 'นามสกุลหญิงตั้งครรภ์',
        idCard: '1111111111111',
        password: bcryptjs.hashSync('1111111111111', salt),
        phoneNumber: '0111111111',
        createdAt: new Date('2020-05-11'),
        updatedAt: new Date('2020-05-11'),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mother_profiles', null, {});
  },
};
