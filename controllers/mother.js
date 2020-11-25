const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { idCard, password } = req.body;
    if (!idCard) {
      return res.status(400).send({ message: 'ID card not exist' });
    }
    if (idCard.length !== 13 || isNaN(idCard)) {
      return res.status(400).send({ message: 'Incorrect ID card format' });
    }
    if (!password) {
      return res.status(400).send({ message: 'Password not exist' });
    }

    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard, isActive: true } });
    if (!targetIdCard) {
      res.status(400).send({ message: 'Username or Password is wrong.' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetIdCard.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Username or Password is wrong.' });
      } else {
        const payload = { id: targetIdCard.id, createAt: new Date(), role: 'mother' };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 604800 }); //token exp: 1 week
        res.status(200).send({ token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { login };
