const db = require('../models');
const bcryptjs = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = await db.Staff.findOne({ where: { username } });
    if (targetUser) {
      res.status(400).send({ message: 'Username already taken.' });
    } else {
      if (password.length < 6) {
        res.status(400).send({ message: 'Please enter password more than 6 character' });
      } else {
        const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
        const hashedPassword = bcryptjs.hashSync(password, salt);
        const newStaff = await db.Staff.create({
          username,
          password: hashedPassword,
        });

        res.status(201).send(newStaff);
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { username, setPassword } = req.body;
    if (setPassword.length < 6) {
      return res.status(400).send({ message: 'Please enter password more than 6 character' });
    }

    const targetUser = await db.Staff.findOne({ where: { username } });
    if (!targetUser) {
      res.status(400).send({ message: 'This username is not found' });
    } else {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcryptjs.hashSync(setPassword, salt);
      await targetUser.update({ password: hashedPassword });

      res.status(200).send({ message: 'Password has been reset' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  resetPassword,
};
