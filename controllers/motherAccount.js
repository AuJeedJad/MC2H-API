const db = require('../models');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const motherFind = async (req, res, next) => {
  try {
    const idCard = req.query.idCard;
    if (!idCard) {
      return res.status(400).send({ message: 'ไม่ได้กรอกเลขประจำตัวประชาชน' });
    }
    if (idCard.length !== 13 || isNaN(idCard)) {
      return res.status(400).send({ message: 'เลขประจำตัวประชาชนต้องกรอกเป็นตัวเลข 13 หลักเท่านั้น' });
    }

    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });

    if (!targetIdCard) {
      res.status(404).send({ message: 'เลขประจำตัวประชาชนนี้ยังไม่เคยลงทะเบียน' });
    } else {
      let isActive = false;
      let curPregId = '';
      let GA = 0;
      let isTerminate = false;
      let EDD;
      if (targetIdCard.isActive === true) {
        const targetCurPreg = await db.CurrentPregnancy.findOne({
          where: { motherId: targetIdCard.id, inactiveDate: { [Op.gte]: new Date() } },
        });
        if (targetCurPreg) {
          isActive = targetCurPreg.inactiveDate;
          curPregId = targetCurPreg.id;
          isTerminate = targetCurPreg.giveBirthAt ? true : false;
          if (targetCurPreg.correctedBy) {
            EDD =
              targetCurPreg.correctedBy === 'LMP'
                ? targetCurPreg.dateByLMP
                : targetCurPreg.correctedBy === 'U/S'
                ? targetCurPreg.dateByUltrasound
                : targetCurPreg.correctedBy === 'PV'
                ? targetCurPreg.dateByPV
                : targetCurPreg.dateByUtSize;
          } else {
            const targetContra = await db.Contraception.findOne({ where: { curPregId: targetCurPreg.id } });
            if (targetContra && targetContra.isRegularMensPeriod && targetCurPreg.dateByLMP) {
              EDD = targetCurPreg.dateByLMP;
            } else if (
              targetCurPreg.dateByUtSize ||
              targetCurPreg.dateByPV ||
              targetCurPreg.dateByUltrasound ||
              targetCurPreg.dateByLMP
            ) {
              EDD = targetCurPreg.dateByUltrasound
                ? targetCurPreg.dateByUltrasound
                : targetCurPreg.dateByLMP
                ? targetCurPreg.dateByLMP
                : targetCurPreg.dateByUtSize
                ? targetCurPreg.dateByUtSize
                : targetCurPreg.dateByPV;
            } else {
              EDD = false;
            }
          }

          if (EDD) {
            const countDownDate = Math.ceil((new Date(EDD).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24);
            GA = (280 - countDownDate) / 7;
          } else {
            GA = 0;
          }
        } else {
          targetIdCard.isActive = false;
          targetIdCard.save();
        }
      }
      res.status(200).send({
        id: targetIdCard.id,
        firstName: targetIdCard.firstName,
        lastName: targetIdCard.lastName,
        isActive: isActive,
        curPregId,
        createdAt: targetIdCard.createdAt,
        GA,
        isTerminate,
      });
    }
  } catch (err) {
    next(err);
    // console.log(err);
    // res.status(500).send({ message: err.message });
  }
};

const motherRegister = async (req, res) => {
  try {
    const { idCard, firstName, lastName, phoneNumber } = req.body;
    if (!idCard) {
      return res.status(400).send({ message: 'ไม่ได้กรอกเลขประจำตัวประชาชน' });
    }
    if (idCard.length !== 13 || isNaN(idCard)) {
      return res.status(400).send({ message: 'เลขประจำตัวประชาชนต้องกรอกเป็นตัวเลข 13 หลักเท่านั้น' });
    }

    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });

    if (targetIdCard) {
      res.status(400).send({ message: 'เลขประจำตัวประชาชนนี้ เคยลงทะเบียนหญิงตั้งครรภ์แล้ว' });
    } else {
      if (!firstName) {
        return res.status(400).send({ message: 'ไม่ได้กรอกชื่อ' });
      }

      if (!lastName) {
        return res.status(400).send({ message: 'ไม่ได้กรอกนามสกุล' });
      }

      if (!phoneNumber) {
        return res.status(400).send({ message: 'ไม่ได้กรอกเบอร์โทร' });
      }

      if (isNaN(phoneNumber || phoneNumber.length < 9 || phoneNumber.length > 10)) {
        return res.status(400).send({ message: 'รูปแบบเบอร์โทรไม่ถูกต้อง 0999999999' });
      }

      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcryptjs.hashSync(idCard, salt);
      const newMotherProfile = await db.MotherProfile.create({
        idCard,
        firstName,
        lastName,
        phoneNumber,
        password: hashedPassword,
      });

      const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });
      const newCurrentPregnancy = await db.CurrentPregnancy.create({ motherId: targetIdCard.id });

      res.status(201).send({ id: newCurrentPregnancy.id });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createCurrentPregnancy = async (req, res) => {
  try {
    const { id } = req.body;

    const targetMotherProfile = await db.MotherProfile.findOne({ where: { id } });
    if (!targetMotherProfile) {
      return res.status(404).send({ message: 'ไม่พบ motherProfile ID ในฐานข้อมูล' });
    }

    const newCurrentPregnancy = await db.CurrentPregnancy.create({ motherId: targetMotherProfile.id });
    res.status(201).send({ message: 'สร้างครรภ์ใหม่เรียบร้อยแล้ว' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  motherFind,
  motherRegister,
  createCurrentPregnancy,
};
