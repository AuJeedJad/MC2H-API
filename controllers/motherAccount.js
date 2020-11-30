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
      if (targetIdCard.isActive === true) {
        const targetCurPreg = await db.CurrentPregnancy.findOne({
          where: { motherId: targetIdCard.id, inactiveDate: { [Op.gte]: new Date() } },
        });
        if (targetCurPreg) {
          isActive = targetCurPreg.inactiveDate;
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
        createdAt: targetIdCard.createdAt,
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
    if (targetMotherProfile) {
      return res.status(400).send({ message: 'Previous pregnancy still' });
    }

    console.log(targetIdCard.isActive);
    // const newCurrentPregnancy = await db.CurrentPregnancy.create({ motherId: targetIdCard.id });

    res.status(201).send(newCurrentPregnancy);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  motherFind,
  motherRegister,
  createCurrentPregnancy,
};
