const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({ message: 'Username not exist' });
    }
    if (!password) {
      return res.status(400).send({ message: 'Password not exist' });
    }
    const targetUser = await db.Staff.findOne({ where: { username, isActive: true } });
    if (!targetUser) {
      res.status(400).send({ message: 'Incorrect username or password' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Incorrect username or password' });
      } else {
        const payload = { id: targetUser.id, createAt: new Date(), role: 'staff' };
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
      return res.status(400).send({ message: 'ID card not exist' });
    }
    if (idCard.length !== 13 || isNaN(idCard)) {
      return res.status(400).send({ message: 'Incorrect ID card format' });
    }

    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });

    if (targetIdCard) {
      res.status(400).send({ message: 'IdCard: ' + idCard + ' already exist.' });
    } else {
      if (!firstName) {
        return res.status(400).send({ message: 'First name not exist.' });
      }

      if (!lastName) {
        return res.status(400).send({ message: 'Last name not exist.' });
      }

      if (!phoneNumber) {
        return res.status(400).send({ message: 'กรุณาใส่เบอร์โทรศัพท์ของหญิงตั้งครรภ์' });
      }

      if (isNaN(phoneNumber)) {
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
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createCurrentPregnancy = async (req, res) => {
  try {
    const { idCard } = req.body;
    if (!idCard) {
      res.status(400).send({ message: 'กรุณาใส่หมายเลขบัตรประชาชนของหญิงตังครรภ์' });
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
