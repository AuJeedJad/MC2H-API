'use strict';
require('dotenv').config();
const bcryptjs = require('bcryptjs');
const password = '123456';
const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
const hashedPassword = bcryptjs.hashSync(password, salt);

const { Hospital } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const chula = await Hospital.findOne({ where: { name: 'จุฬาลงกรณ์' } });
    const siriraj = await Hospital.findOne({ where: { name: 'ศิริราช' } });

    return queryInterface.bulkInsert('staffs', [
      {
        username: 'cu1',
        password: hashedPassword,
        hospitalId: chula.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'cu2',
        password: hashedPassword,
        hospitalId: chula.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'si1',
        password: hashedPassword,
        hospitalId: siriraj.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'si2',
        password: hashedPassword,
        hospitalId: siriraj.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('staffs', null, {});
  },
};
