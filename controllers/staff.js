const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = await db.Staff.findOne({ where: { username, isActive: true } });
    if (!targetUser) {
      res.status(400).send({ message: 'Username or Password is wrong.' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Username or Password is wrong.' });
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
  const { idCard, firstName, lastName, phoneNumber, email } = req.body;
  const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });
  if (targetIdCard) {
    res.status(400).send({ message: 'Username already taken.' });
  } else {
    const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPassword = bcryptjs.hashSync(idCard, salt);
    const newMotherProfile = await db.MotherProfile.create({
      idCard,
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    res.status(201).send(newMotherProfile);
  }
};

const createCurrentPregnancy = (req, res) => {
  res.send();
};

module.exports = {
  login,
  motherRegister,
  createCurrentPregnancy,
};
