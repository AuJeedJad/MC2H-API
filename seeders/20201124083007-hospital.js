'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hospitals', [
      {
        name: 'จุฬาลงกรณ์',
        address: '123 ถ.พระราม4',
        subDistrict: 'ปทุมวัน',
        district: 'ปทุมวัน',
        province: 'กทม.',
        zipCode: '10400',
      },
      {
        name: 'ศิริราช',
        address: '123 ถ.พรานนก',
        subDistrict: 'บางกอก',
        district: 'บางกอก',
        province: 'กทม.',
        zipCode: '10300',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hospitals', null, {});
  },
};
