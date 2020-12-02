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
