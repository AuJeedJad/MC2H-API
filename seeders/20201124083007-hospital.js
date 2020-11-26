'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hospitals', [
      {
        name: 'จุฬาลงกรณ์',
        address: '1873 ถ.พระราม4',
        subDistrict: 'ปทุมวัน',
        district: 'ปทุมวัน',
        province: 'กทม.',
        zipCode: '10330',
      },
      {
        name: 'ศิริราช',
        address: '2 ถ.หวังหลัง',
        subDistrict: 'ศิริราช',
        district: 'บางกอกน้อย',
        province: 'กทม.',
        zipCode: '10700',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hospitals', null, {});
  },
};
