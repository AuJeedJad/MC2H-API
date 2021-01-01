'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('static_risk_evaluations', [
      {
        checkList: 'เคยมีทารกตายในครรภ์หรือเสียชีวิตเเรกเกิด ( 1 เดือนเเรก )',
        type: 'history',
      },
      {
        checkList: 'เคยเเท้ง 3 ครั้ง ติดต่อกันหรือมากกว่าติดต่อกัน',
        type: 'history',
      },
      {
        checkList: 'เคยคลอดบุตรน้ำหนักน้อยกว่า 2500 กรัม หรือคลอดเมื่ออายุครรภ์น้อยกว่า 37 สัปดาห์',
        type: 'history',
      },
      {
        checkList: 'เคยคลอดบุตรน้ำหนักมากกว่า 4000 กรัม" label="เคยคลอดบุตรน้ำหนักมากกว่า 4000 กรัม',
        type: 'history',
      },
      {
        checkList: 'เคยเข้ารับการรักษาพยาบาลความดันโลหิตสูงระหว่างตั้งครรภ์หรือครรภ์เป็นพิษ',
        type: 'history',
      },
      {
        checkList: 'เคยผ่าตัดอวัยวะในระบบสืบพันธุ์ เช่น เนื้องอกมดลูก ผ่าตัดคลอด ผูกปากมดลุก ฯลฯ',
        type: 'history',
      },
      {
        checkList: 'ครรภ์แฝด',
        type: 'present',
      },
      {
        checkList: 'อายุ < 17 ปี (นับถึง EDC)',
        type: 'present',
      },
      {
        checkList: 'อายุ > 35 ปี (นับถึง EDC)',
        type: 'present',
      },
      {
        checkList: 'Rh negative',
        type: 'present',
      },
      {
        checkList: 'เลือดออกทางช่องคลอด',
        type: 'present',
      },
      {
        checkList: 'มีก้อนในอุ้งเชิงกราน',
        type: 'present',
      },
      {
        checkList: 'ความดันโลหิต Diastolic >= 90 mmHG',
        type: 'present',
      },
      {
        checkList: 'BMI < 18.5 กก./ตรม.',
        type: 'present',
      },
      {
        checkList: 'โลหิตจาง',
        type: 'medicine',
      },
      {
        checkList: 'โรคเบาหวาน',
        type: 'medicine',
      },
      {
        checkList: 'โรคไต',
        type: 'medicine',
      },
      {
        checkList: 'โรคหัวใจ',
        type: 'medicine',
      },
      {
        checkList: 'ติดยาเสพติด ติดสุรา สูบบุหรี่ คนใกล้ชิดบุหรี่',
        type: 'medicine',
      },
      {
        checkList: 'โรคอายุรกรรม อื่นๆ',
        type: 'medicine',
      },
      {
        checkList: 'อื่นๆ',
        type: 'medicine',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('static_risk_evaluations', null, {});
  },
};
