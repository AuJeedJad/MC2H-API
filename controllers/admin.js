const db = require('../models');
const bcryptjs = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { username, password, hospitalId, secretKey } = req.body;
    if (!username) {
      return res.status(400).send({ message: 'กรุณาใส่ username' });
    }
    if (!password) {
      return res.status(400).send({ message: 'กรุณาใส่ password' });
    }
    if (!hospitalId) {
      return res.status(400).send({ message: 'กรุณาใส่ hospital id' });
    }
    if (!secretKey) {
      return res.status(400).send({ message: 'กรุณาใส่รหัส admin' });
    } else {
      const isCorrect = await bcryptjs.compareSync(secretKey, process.env.HASHED_SECRET_KEY);
      if (!isCorrect) {
        return res.status(400).send({ message: 'รหัสไม่ถูกต้อง' });
      }
    }
    const targetUser = await db.Staff.findOne({ where: { username } });
    if (targetUser) {
      res.status(400).send({ message: 'Username นี้มีในระบบแล้ว' });
    } else {
      if (password.length < 6) {
        res.status(400).send({ message: 'กรุณาใส่รหัสผ่านอย่างน้อย 6 ตัวอักษร' });
      } else {
        const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
        const hashedPassword = bcryptjs.hashSync(password, salt);
        const newStaff = await db.Staff.create({
          username,
          hospitalId,
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
    const { username, setPassword, secretKey } = req.body;
    if (!username) {
      return res.status(400).send({ message: 'กรุณาใส่ username ที่ต้องการเปลี่ยนรหัส' });
    }
    if (!setPassword) {
      return res.status(400).send({ message: 'กรุณาใส่รหัสที่ต้องการตั้งใหม่' });
    } else {
      if (setPassword.length < 6) {
        return res.status(400).send({ message: 'กรุณาใส่รหัสผ่านอย่างน้อย 6 ตัวอักษร' });
      }
    }
    if (!secretKey) {
      return res.status(400).send({ message: 'กรุณาใส่รหัส admin' });
    } else {
      const isCorrect = await bcryptjs.compareSync(secretKey, process.env.HASHED_SECRET_KEY);
      if (!isCorrect) {
        return res.status(400).send({ message: 'รหัสไม่ถูกต้อง' });
      }
    }

    const targetUser = await db.Staff.findOne({ where: { username } });
    if (!targetUser) {
      res.status(400).send({ message: 'ไม่มี username นี้ในระบบ' });
    } else {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcryptjs.hashSync(setPassword, salt);
      await targetUser.update({ password: hashedPassword });

      res.status(200).send({ message: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  resetPassword,
};
