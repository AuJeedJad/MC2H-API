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
        uterusSize: '43',
        childPosture: 'Normal',
        heartSound: '145',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '5',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-27'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '2',
        checkHospitalId: '2',
        nextHospitalId: '2',
        examDate: new Date(),
        weight: '55',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43',
        childPosture: 'Normal',
        heartSound: '145',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '4',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-28'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'การรักษาเพิ่มเติม',
        nippleExam: 'สั้น',
        isChecked: true,
      },
      {
        curPregId: '1',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date(),
        weight: '57',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43',
        childPosture: 'Normal',
        heartSound: '145',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '6',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-27'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'ภาวะเครียด',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '2',
        checkHospitalId: '2',
        nextHospitalId: '2',
        examDate: new Date(),
        weight: '87',
        urineTest: 'Normal',
        bloodPressure: 'Normal',
        uterusSize: '43',
        childPosture: 'Normal',
        heartSound: '145',
        childMove: '4',
        gaByLmp: '20',
        gaByUs: '8',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-27'),
        lastEdit: new Date(),
        examBy: 'Wow',
        nutritionEvaResult: 'ภาวะเครียด',
        nippleExam: 'สั้น',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-05-11'),
        weight: '65',
        urineTest: 'Normal',
        bloodPressure: '120/80',
        gaByLmp: '2',
        childPosture: 'Normal',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-07-06'),
        examDate: new Date('2020-05-11'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        lastEdit: new Date('2020-05-11'),
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-07-06'),
        weight: '67',
        urineTest: 'Normal',
        bloodPressure: '122/80',
        gaByLmp: '10',
        childPosture: 'Normal',
        heartSound: '160',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-08-03'),
        lastEdit: new Date('2020-07-06'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-08-03'),
        weight: '68',
        urineTest: 'Normal',
        bloodPressure: '125/82',
        gaByLmp: '14',
        childPosture: 'Normal',
        heartSound: '155',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-08-31'),
        lastEdit: new Date('2020-08-03'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-08-31'),
        weight: '70',
        urineTest: 'Normal',
        bloodPressure: '122/80',
        gaByLmp: '18',
        childPosture: 'Normal',
        heartSound: '145',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-09-28'),
        lastEdit: new Date('2020-08-31'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-09-28'),
        weight: '70',
        urineTest: 'Normal',
        bloodPressure: '122/80',
        gaByLmp: '22',
        uterusSize: '20',
        childPosture: 'Normal',
        heartSound: '140',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-10-26'),
        lastEdit: new Date('2020-09-28'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-10-26'),
        weight: '73',
        urineTest: 'Normal',
        bloodPressure: '122/80',
        gaByLmp: '26',
        uterusSize: '25',
        childPosture: 'Normal',
        heartSound: '138',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-11-23'),
        lastEdit: new Date('2020-10-26'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-11-23'),
        weight: '75',
        urineTest: 'Normal',
        bloodPressure: '122/80',
        gaByLmp: '30',
        uterusSize: '30',
        childPosture: 'LOA',
        heartSound: '140',
        childMove: '4',
        physicalExamination: 'normal',
        appointmentDate: new Date('2020-12-21'),
        lastEdit: new Date('2020-11-23'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
      {
        curPregId: '3',
        checkHospitalId: '1',
        nextHospitalId: '1',
        examDate: new Date('2020-12-21'),
        weight: '75',
        urineTest: 'Normal',
        bloodPressure: '122/80',
        gaByLmp: '34',
        uterusSize: '34',
        childPosture: 'LOA engagement',
        heartSound: '140',
        childMove: '6',
        physicalExamination: 'LOA engagement',
        appointmentDate: new Date('2021-01-04'),
        lastEdit: new Date('2020-12-21'),
        examBy: 'ชื่อแพทย์ผู้ตรวจ',
        nutritionEvaResult: 'ปรกติ',
        nippleExam: 'ปรกติ',
        isChecked: true,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ancs', null, {});
  },
};
