'use strict';
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const password = '123456';
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
const hashedPassword = bcryptjs.hashSync(password, salt);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('staffs', [
      {
        username: 'cu1',
        password: hashedPassword,
        hospitalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'cu2',
        password: hashedPassword,
        hospitalId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'si1',
        password: hashedPassword,
        hospitalId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'si2',
        password: hashedPassword,
        hospitalId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('staffs', null, {});
  },
};
