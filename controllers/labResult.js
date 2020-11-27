const db = require('../models');
const { Op } = require('sequelize');

const recordLabResult = async (req, res) => {
  try {
    const { curPregId } = req.body;
    if (!curPregId) {
      return res.status(400).send({ message: 'Please check curPregId.' });
    }
    const targetCerPreg = await db.CurrentPregnancy.findOne({
      where: { id: curPregId, inactiveDate: { [Op.gte]: new Date() } },
    });
    if (!targetCerPreg) {
      return res.status(400).send({ message: '' });
    }

    const {
      labResultId,
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

    // if (!bloodGroup) {
    //   return res.status(400).send({ message: 'Please enter result of Blood group.' });
    // }

    // if (!hctHb) {
    //   return res.status(400).send({ message: 'Please enter result of Hct/Hb.' });
    // }

    // if (!ofMcvMch) {
    //   return res.status(400).send({ message: 'Please enter result of OF/MCV, MCH.' });
    // }

    // if (!dcip) {
    //   return res.status(400).send({ message: 'Please enter result of DCIP.' });
    // }

    // if (!hbTyping) {
    //   return res.status(400).send({ message: 'Please enter result of Hb typing.' });
    // }

    // if (!pcr) {
    //   return res.status(400).send({ message: 'Please enter result of PCR.' });
    // }

    // if (!hepatitisBVirus) {
    //   return res.status(400).send({ message: 'Please enter result of hepatitis B Virus.' });
    // }

    // if (!syphilis) {
    //   return res.status(400).send({ message: 'Please enter result of syphilis.' });
    // }

    // if (!hiv) {
    //   return res.status(400).send({ message: 'Please enter result of HIV.' });
    // }

    // if (!role) {
    //   return res.status(400).send({ message: 'Please choose mother or father.' });
    // }

    const targetLabResult = await db.LabResult.findOne({ where: { id: labResultId ? labResultId : null, curPregId } });
    if (targetLabResult) {
      //Update
      await targetLabResult.update({
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
      res.status(201).send(newLabResult);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = { recordLabResult };
