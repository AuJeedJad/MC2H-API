const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({ message: 'กรุณาใส่ username' });
    }
    if (!password) {
      return res.status(400).send({ message: 'กรุณาใส่ password' });
    }
    const targetUser = await db.Staff.findOne({ where: { username, isActive: true } });
    if (!targetUser) {
      res.status(400).send({ message: 'Username หรือ Password ไม่ถูกต้อง' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Username หรือ Password ไม่ถูกต้อง' });
      } else {
        const payload = { id: targetUser.id, createAt: new Date() };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 2592000 }); //token exp: 1 month

        res.status(200).send({ token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const motherRegister = async (req, res) => {
  try {
    const { idCard, firstName, lastName, phoneNumber } = req.body;
    if (!idCard) {
      res.status(400).send({ message: 'กรุณาใส่หมายเลขบัตรประชาชนชองหญิงตังครรภ์' });
    } else if (idCard.length < 13) {
      res.status(400).send({ message: 'หมายเลขประจำตัวประชาชนไม่ครบ 13 หลัก' });
    } else if (idCard.length > 13) {
      res.status(400).send({ message: 'หมายเลขประจำตัวประชาชนเกิน 13 หลัก' });
    } else if (isNaN(+idCard)) {
      res.status(400).send({ message: 'ใส่หมายเลขบัตรประชาชนไม่ถูกต้อง กรุณาตรวจสอบหมายเลขบัตรประชาชน' });
    } else {
      const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });
      if (targetIdCard) {
        res.status(400).send({ message: 'เลขประจำตัวประชาชน ' + idCard + ' เคยลงทะเบียนหญิงตั้งครรภ์ในระบบแล้ว' });
      } else {
        if (!firstName) {
          return res.status(400).send({ message: 'กรุณาใส่ชื่อของหญิงตั้งครรภ์' });
        }
        if (!lastName) {
          return res.status(400).send({ message: 'กรุณาใส่นามสกุลของหญิงตั้งครรภ์' });
        }
        if (!phoneNumber) {
          return res.status(400).send({ message: 'กรุณาใส่เบอร์โทรศัพท์ของหญิงตั้งครรภ์' });
        } else if (isNaN(+phoneNumber)) {
          return res.status(400).send({ message: 'เบอร์โทรศัพท์ไม่ถูกต้อง กรุณาตรวจสอบเบอร์โทรศัพท์' });
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

        res.status(201).send(newMotherProfile);
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createCurrentPregnancy = async (req, res) => {
  try {
    const { idCard } = req.body;
    if (!idCard) {
      res.status(400).send({ message: 'กรุณาใส่หมายเลขบัตรประชาชนชองหญิงตังครรภ์' });
    } else if (idCard.length < 13) {
      res.status(400).send({ message: 'หมายเลขประจำตัวประชาชนไม่ครบ 13 หลัก' });
    } else if (idCard.length > 13) {
      res.status(400).send({ message: 'หมายเลขประจำตัวประชาชนเกิน 13 หลัก' });
    } else if (isNaN(+idCard)) {
      res.status(400).send({ message: 'ใส่หมายเลขบัตรประชาชนไม่ถูกต้อง กรุณาตรวจสอบหมายเลขบัตรประชาชน' });
    } else {
      const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });
      const newCurrentPregnancy = await db.CurrentPregnancy.create({ motherId: targetIdCard.id });

      res.status(201).send(newCurrentPregnancy);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  login,
  motherRegister,
  createCurrentPregnancy,
};
