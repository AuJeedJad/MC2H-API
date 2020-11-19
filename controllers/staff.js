const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = await db.Staff.findOne({ where: { username } });
    if (!targetUser) {
      res.status(400).send({ message: 'Username or Password is wrong.' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Username or Password is wrong.' });
      } else {
        const payload = { id: targetUser.id, createAt: new Date() };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 2592000 });//token exp: 1 month

        res.status(200).send({ token });
      }
    }
  }catch(err){
    res.status(500).send({ message: err.message })
  }
};

module.exports = { login };