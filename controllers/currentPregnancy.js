const db = require('../models');
const { Op } = require('sequelize');

const recordWeightAndHeightOfMother = async (req, res) => {
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
      const { beforePregWeight, beforePregHeight } = req.body;
      await targetCurPreg.update({ beforePregWeight, beforePregHeight });
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
      const { downsyndromScreen, riskEvaluate, amniocentesis, otherLabResult } = req.body;
      await targetCurPreg.update({ downsyndromScreen, riskEvaluate, amniocentesis, otherLabResult });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const recordCoupleCounsel = async (req, res) => {
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
      const { coupleCounselingDate1, coupleCounselingDate2 } = req.body;
      await targetCurPreg.update({ coupleCounselingDate1, coupleCounselingDate2 });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const recordParentSchool = async (req, res) => {
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
      const { parentSchoolDate1, parentSchoolDate2 } = req.body;
      await targetCurPreg.update({ parentSchoolDate1, parentSchoolDate2 });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { recordWeightAndHeightOfMother, recordDownsyndrome, recordCoupleCounsel, recordParentSchool };

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
  updateNote,
  getCurrentPregnancy,
  // getCurrentPregnancy1,
};
