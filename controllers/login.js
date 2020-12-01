const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const staffLogin = async (req, res) => {
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
        const payload = { id: targetUser.id, hospitalId: targetUser.hospitalId, createAt: new Date(), role: 'staff' };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 2592000 }); //token exp: 1 month
        res.status(200).send({ token });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const motherLogin = async (req, res) => {
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

    const targetIdCard = await db.MotherProfile.findOne({ where: { idCard } });
    if (!targetIdCard) {
      res.status(400).send({ message: 'Username or Password is wrong.' });
    } else {
      const isCorrect = await bcryptjs.compareSync(password, targetIdCard.password);

      if (!isCorrect) {
        res.status(400).send({ message: 'Username or Password is wrong.' });
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
            createdAt = targetCurPreg.createdAt;
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
        const payload = { id: targetIdCard.id, createAt: new Date(), role: 'mother' };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 604800 }); //token exp: 1 week
        res.status(200).send({
          token,
          motherContext: {
            id: targetIdCard.id,
            firstName: targetIdCard.firstName,
            lastName: targetIdCard.lastName,
            isActive: isActive,
            curPregId,
            createdAt,
            GA,
            isTerminate,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  motherLogin,
  staffLogin,
};
