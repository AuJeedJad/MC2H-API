'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('static_risk_evaluations', [
      {
        checkList: 'ทารกตายในครรภ์',
        type: 'History',
      },
      {
        checkList: 'เเท้ง 3 ครั้ง',
        type: 'History',
      },
      {
        checkList: 'คลอดบุตรน้ำหนักน้อยกว่า 2,500 กรัม',
        type: 'History',
      },
      {
        checkList: 'คลอดบุตรน้ำหนักมากกว่า 4,000 กรัม',
        type: 'History',
      },
      {
        checkList: 'ครรภ์เป็นพิษ',
        type: 'History',
      },
      {
        checkList: 'ผ่าตัดอวัยวะสืบพันธุ์',
        type: 'History',
      },
      {
        checkList: 'ครรภ์แฝด',
        type: 'Present',
      },
      {
        checkList: 'อายุ < 17 ปี',
        type: 'Present',
      },
      {
        checkList: 'อายุ > 35 ปี',
        type: 'Present',
      },
      {
        checkList: 'Rh negative',
        type: 'Present',
      },
      {
        checkList: 'เลือดออกทางช่องคลอด',
        type: 'Present',
      },
      {
        checkList: 'ก้อนในอุ้งเชิงกราน',
        type: 'Present',
      },
      {
        checkList: 'ความดันโลหิต',
        type: 'Present',
      },
      {
        checkList: 'BMI < 18.5',
        type: 'Present',
      },
      {
        checkList: 'โลหิตจาง',
        type: 'Medicine',
      },
      {
        checkList: 'เบาหวาน',
        type: 'Medicine',
      },
      {
        checkList: 'ไต',
        type: 'Medicine',
      },
      {
        checkList: 'หัวใจ',
        type: 'Medicine',
      },
      {
        checkList: 'ยาเสพติด',
        type: 'Medicine',
      },
      {
        checkList: 'โรคอายุรกรรม',
        type: 'Medicine',
      },
      {
        checkList: 'อื่น',
        type: 'Medicine',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('static_risk_evaluations', null, {});
  },
};
