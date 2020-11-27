const db = require('../models');

const getMedicalHistory = async (req, res, next) => {
  try {
    const { motherId } = req.body;
    const allData = await db.MotherMedicalHistory.findOne({
      where: {
        motherId,
      },
      include: [
        {
          model: db.DrugAllergy,
          attributes: ['id', 'drugName', 'symptom'],
        },
        {
          model: db.CesareanSection,
          attributes: ['id', 'year', 'hospital'],
        },
        {
          model: db.FamilyMedicalHistory,
          attributes: [
            'id',
            'isSeizure',
            'isDiabetes',
            'isHypertension',
            'isBirthDefect',
            'isTwin',
            'isMentalRetardation',
            'otherDisease',
          ],
        },
      ],
    });
    res.status(200).send(allData);
  } catch (err) {
    next(err);
  }
};

const getPregnantHistory = async (req, res, next) => {
  try {
    const { motherId } = req.query;
    const pregnantHistory = await db.PregnantHistory.findAll({
      where: {
        motherId,
      },
      include: {
        model: db.MotherProfile,
        attributes: ['id'],
      },
    });
    res.status(200).send(pregnantHistory);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMedicalHistory,
  getPregnantHistory,
};
