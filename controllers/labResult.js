const db = require('../models');
const { Op } = require('sequelize');

const recordLabResult = async (req, res) => {
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

    const {
      labResultId,
      date,
      bloodGroup,
      hctHb,
      ofMcvMch,
      dcip,
      hbTyping,
      pcr,
      hepatitisBVirus,
      syphilis,
      hiv,
      role,
    } = req.body;
    console.log(labResultId);
    const targetLabResult = await db.LabResult.findOne({ where: { id: labResultId ? labResultId : null, curPregId } });
    if (targetLabResult) {
      //Update
      await targetLabResult.update({
        date,
        bloodGroup,
        hctHb,
        ofMcvMch,
        dcip,
        hbTyping,
        pcr,
        hepatitisBVirus,
        syphilis,
        hiv,
        role,
      });
      res.status(200).send({ message: 'Updated LabResult' });
    } else {
      //Create
      const newLabResult = await db.LabResult.create({
        curPregId,
        date,
        bloodGroup,
        hctHb,
        ofMcvMch,
        dcip,
        hbTyping,
        pcr,
        hepatitisBVirus,
        syphilis,
        hiv,
        role,
      });
      console.log(JSON.stringify(newLabResult));
      res.status(201).send(newLabResult);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

const readAllLabResult = async (req, res, next) => {
  try {
    const curPregId = req.params.id;
    console.log(`curPregId : ${curPregId}`);
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check curPregId.' });
    }

    const allLabResultMother = await db.LabResult.findAll({ where: { curPregId: curPregId, role: 'mother' } });
    if (!allLabResultMother) {
      return res.status(400).send({ message: 'Not Found' });
    }
    const allLabResultFather = await db.LabResult.findAll({ where: { curPregId: curPregId, role: 'father' } });
    if (!allLabResultFather) {
      return res.status(400).send({ message: 'Not Found' });
    }
    console.log(JSON.stringify(allLabResultMother, allLabResultFather));
    res.status(200).send({ allLabResultMother, allLabResultFather });
  } catch (err) {
    next(err);
  }
};

const readLabResultById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Lab Result ID : ${id}`);
    if (!id) {
      return res.status(400).send({ message: 'Please check Lab Result ID.' });
    }

    const targetLabResult = await db.LabResult.findOne({ where: { id } });
    if (!targetLabResult) {
      return res.status(400).send({ message: 'Not Found' });
    }

    console.log(JSON.stringify(targetLabResult));
    res.status(200).send({ targetLabResult });
  } catch (err) {
    next(err);
  }
};

module.exports = { recordLabResult, readAllLabResult, readLabResultById };
