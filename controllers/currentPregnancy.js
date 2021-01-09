const db = require('../models');
const { Op } = require('sequelize');

const recordPregnancyHistoryOfMother = async (req, res) => {
  try {
    const { curPregId } = req.body;
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check curPregId.' });
    }
    const targetCurPreg = await db.CurrentPregnancy.findOne({
      where: { id: curPregId, inactiveDate: { [Op.gte]: new Date() } },
    });

    console.log(targetCurPreg);

    if (!targetCurPreg) {
      return res.status(400).send({ message: 'Not Found' });
    } else {
      const {
        pregnancyNumber,
        numberOfCesarean,
        lastPeriodDate,
        numberOfChildren,
        birthDateOfLastChildren,
        beforePregWeight,
        beforePregHeight,
      } = req.body;

      await targetCurPreg.update({
        pregnancyNumber,
        numberOfCesarean,
        lastPeriodDate,
        numberOfChildren,
        birthDateOfLastChildren,
        beforePregWeight,
        beforePregHeight,
      });

      res.status(200).send({ message: 'Updated PregnancyHistory in CurrentPregnancy' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const recordDownsyndrome = async (req, res) => {
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
    } else {
      const { downsyndromeScreen, riskEvaluate, amniocentesis, otherLabResult } = req.body;
      await targetCurPreg.update({ downsyndromeScreen, riskEvaluate, amniocentesis, otherLabResult });
      res.status(200).send({ message: 'Updated LabResult' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const recordCoupleCounselAndParentSchool = async (req, res) => {
  try {
    const { curPregId, coupleCounselingDate1, coupleCounselingDate2, parentSchoolDate1, parentSchoolDate2 } = req.body;
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check curPregId.' });
    }
    const targetCurPreg = await db.CurrentPregnancy.findOne({
      where: { id: curPregId, inactiveDate: { [Op.gte]: new Date() } },
    });

    if (!targetCurPreg) {
      return res.status(400).send({ message: 'Not Found' });
    } else {
      await targetCurPreg.update({
        coupleCounselingDate1,
        coupleCounselingDate2,
        parentSchoolDate1,
        parentSchoolDate2,
      });
      res.status(200).send({ message: 'Updated LabResult' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    const currentPregId = req.params.id;
    await db.CurrentPregnancy.update(
      {
        note: note,
      },
      {
        where: {
          id: currentPregId,
        },
      }
    );
    res.status(200).send({ message: 'updated successful' });
  } catch (err) {
    next(err);
  }
};

const getCurrentPregnancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentPregnancy = await db.CurrentPregnancy.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send({ currentPregnancy: currentPregnancy });
  } catch (err) {
    next(err);
  }
};

// const getCurrentPregnancy1 = async (req, res, next) => {
//   try {
//     // การทำ Detructjerring
//     const { id } = req.query;
//     // การตั้งชื่อให้รู้ว่าดึงจากตารางอะไร
//     const currentPregnancy = await db.CurrentPregnancy.findOne({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).send({ currentPregnancy: currentPregnancy });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  recordPregnancyHistoryOfMother,
  recordDownsyndrome,
  recordCoupleCounselAndParentSchool,
  updateNote,
  getCurrentPregnancy,
  // getCurrentPregnancy1,
};
