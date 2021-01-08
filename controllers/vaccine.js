const db = require('../models');
const { Op } = require('sequelize');

const recordVaccine = async (req, res) => {
  try {
    const { curPregId } = req.body;
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check curPregId.' });
    }
    const targetCurPreg = await db.CurrentPregnancy.findOne({
      where: { id: curPregId, inactiveDate: { [Op.gte]: new Date() } },
    });
    if (!targetCurPreg) {
      return res.status(400).send({ message: 'Not Found' });
    }

    const targetVaccine = await db.Vaccine.findOne({ where: { curPregId } });
    if (targetVaccine) {
      //update
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
      } = req.body;

      await targetVaccine.update({
        curPregId,
        tetanusCountBefore,
        lastTetanusHxDate,
        tetausDosePefered,
        firstTetanusDate: firstTetanusDate ? new Date(firstTetanusDate) : null,
        secondTetanusDate: secondTetanusDate ? new Date(secondTetanusDate) : null,
        thirdTetanusDate: thirdTetanusDate ? new Date(thirdTetanusDate) : null,
        influenzaDate,
        firstTDPType: firstTDPType ? firstTDPType : null,
        secondTDPType: secondTDPType ? secondTDPType : null,
        thirdTDPType: thirdTDPType ? thirdTDPType : null,
      });

      res.status(200).send({ message: 'Update Vaccine' });
    } else {
      //create
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
      } = req.body;

      const newVaccine = await db.Vaccine.create({
        curPregId,
        tetanusCountBefore,
        lastTetanusHxDate,
        tetausDosePefered,
        firstTetanusDate: firstTetanusDate ? new Date(firstTetanusDate) : null,
        secondTetanusDate: secondTetanusDate ? new Date(secondTetanusDate) : null,
        thirdTetanusDate: thirdTetanusDate ? new Date(thirdTetanusDate) : null,
        influenzaDate,
        firstTDPType: firstTDPType ? firstTDPType : null,
        secondTDPType: secondTDPType ? secondTDPType : null,
        thirdTDPType: thirdTDPType ? thirdTDPType : null,
      });

      res.status(201).send(newVaccine);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const readVaccineByCurPregId = async (req, res, next) => {
  try {
    const { curPregId } = req.params;
    console.log(`CurPreg ID : ${curPregId}`);
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check CurPreg ID.' });
    }

    const targetVaccine = await db.Vaccine.findOne({ where: { curPregId } });
    if (!targetVaccine) {
      return res.status(400).send({ message: 'Not Found' });
    }

    console.log(JSON.stringify(targetVaccine));
    res.status(200).send({ targetVaccine });
  } catch (err) {
    next(err);
  }
};

module.exports = { recordVaccine, readVaccineByCurPregId };
