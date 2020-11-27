'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ancs', [
      {
        curPregId: '1',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date(),
        weight: '70',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43mm',
        childPosture: 'Normal',
        heartSound: '45',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '5',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-27'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
      },
      {
        curPregId: '2',
        checkHospitalId: '2',
        nextHospitalId: '2',
        examDate: new Date(),
        weight: '55',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43mm',
        childPosture: 'Normal',
        heartSound: '45',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '4',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-28'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'การรักษาเพิ่มเติม',
        nippleExam: 'สั้น',
      },
      {
        curPregId: '1',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date(),
        weight: '57',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43mm',
        childPosture: 'Normal',
        heartSound: '45',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '6',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-27'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'ภาวะเครียด',
        nippleExam: 'ปรกติ',
      },
      {
        curPregId: '2',
        checkHospitalId: '2',
        nextHospitalId: '2',
        examDate: new Date(),
        weight: '87',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43mm',
        childPosture: 'Normal',
        heartSound: '45',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '8',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-27'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'ภาวะเครียด',
        nippleExam: 'สั้น',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ancs', null, {});
  },
};
