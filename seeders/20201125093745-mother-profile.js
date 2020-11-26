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
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mother_profiles', null, {});
  },
};
