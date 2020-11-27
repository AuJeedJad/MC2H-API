const { Op } = require('sequelize');
const db = require('../models');

const createVaccine = async (req, res) => {
  try {
    const { curPregId } = req.body;
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check curPregId.' });
    }

    const targetCurPreg = await db.CurrentPregnancy.fineOne({
      where: curPregId,
      inactiveDate: { [Op.gte]: new Date() },
    });

    if (targetCurPreg) {
      res.status(400).send({ message: 'Cannot created new vaccine table because curPregId already taken.' });
    } else {
      const {
        tetanusCountBefore,
        lastTetanusHxDate,
        tetausDosePefered,
        firstTetanusDate,
        secondTetanusDate,
        thirdTetanusDate,
        influenzaDate,
        firstTDPType,
        secondTDPType,
        thirdTDPType,
      } = res.body;

      const newVaccine = await db.Vaccine.create({
        curPregId,
        tetanusCountBefore,
        lastTetanusHxDate,
        tetausDosePefered,
        firstTetanusDate,
        secondTetanusDate,
        thirdTetanusDate,
        influenzaDate,
        firstTDPType,
        secondTDPType,
        thirdTDPType,
      });

      res.status(201).send(newVaccine);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createVaccine };
