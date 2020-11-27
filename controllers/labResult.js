const db = require('../models');
const { Op } = require('sequelize');

const recordLabResult = async (req, res) => {
  try {
    const {
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
    } = req.body;
    if (!bloodGroup) {
      return res.status(400).send({ message: 'Please enter result of Blood group.' });
    }

    if (!hctHb) {
      return res.status(400).send({ message: 'Please enter result of Hct/Hb.' });
    }

    if (!ofMcvMch) {
      return res.status(400).send({ message: 'Please enter result of OF/MCV, MCH.' });
    }

    if (!dcip) {
      return res.status(400).send({ message: 'Please enter result of DCIP.' });
    }

    if (!hbTyping) {
      return res.status(400).send({ message: 'Please enter result of Hb typing.' });
    }

    if (!pcr) {
      return res.status(400).send({ message: 'Please enter result of PCR.' });
    }

    if (!hepatitisBVirus) {
      return res.status(400).send({ message: 'Please enter result of hepatitis B Virus.' });
    }

    if (!syphilis) {
      return res.status(400).send({ message: 'Please enter result of syphilis.' });
    }

    if (!hiv) {
      return res.status(400).send({ message: 'Please enter result of HIV.' });
    }

    if (!role) {
      return res.status(400).send({ message: 'Please choose mother or father.' });
    }

    const targetLabResultByCurPregId = await db.LebResult.fineOne({
      where: { curPregId, inactiveDate: { [Op.gte]: new Date() } },
    });
    if (!targetLabResultByCurPregId) {
      res.status(400).send({ message: 'Not found. Please check your curPregId.' });
    } else {
      const newLabResult = await targetLabResultByCurPregId.create({
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
      res.status(201).send();
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { recordLabResult };
