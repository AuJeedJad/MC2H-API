const db = require('../models');
const bcryptjs = require('bcryptjs');

const motherFind = async (req, res) => {
  try {
    const idCard = req.query.idCard;
    if (!idCard) {
      return res.status(400).send({ message: 'ID card not exist' });
    }
    if (idCard.length !== 13 || isNaN(idCard)) {
      return res.status(400).send({ message: 'Incorrect ID card format' });
    }

    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });

    if (!targetIdCard) {
      res.status(404).send({ message: 'Non subscribe ID card number' });
    } else {
      res.status(200).send(targetIdCard);
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
      // const CurrentPreg =await db.CurrentPregnancy.findOne({ where: { idCard } });
    } else {
      if (!firstName) {
        return res.status(400).send({ message: 'First name not exist.' });
      }

      if (!lastName) {
        return res.status(400).send({ message: 'Last name not exist.' });
      }

      if (!phoneNumber) {
        return res.status(400).send({ message: 'Phone number not exist' });
      }

      if (isNaN(phoneNumber || phoneNumber.length < 9 || phoneNumber.length > 10)) {
        return res.status(400).send({ message: 'Incorrect phone number format' });
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
      return res.status(400).send({ message: 'ID card not exist' });
    }
    if (idCard.length !== 13 || isNaN(idCard)) {
      return res.status(400).send({ message: 'Incorrect ID card format' });
    }
    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });
    const newCurrentPregnancy = await db.CurrentPregnancy.create({ motherId: targetIdCard.id });

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
