const db = require('../models');

const getMotherReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'Current Pregnancy Id not exist' });
    }

    const targetCurPreg = await db.CurrentPregnancy.findOne({
      where: { id },
      attributes: [
        'correctedBy',
        'dateByLMP',
        'dateByUltrasound',
        'dateByPV',
        'dateByUtSize',
        'UsAtGA',
        'PvAtGA',
        'UtAtGA',
        'note',
        'beforePregWeight',
      ],
    });

    if (!targetCurPreg) {
      return res.status(404).send({ message: 'Current Pregnancy Id not found' });
    }

    const targetANC = await db.ANC.findOne({
      where: { isChecked: true },
      order: [['examDate', 'DESC']],
      attributes: [
        'urineTest',
        'bloodPressure',
        'childPosture',
        'uterusSize',
        'heartSound',
        'childMove',
        'gaByLmp',
        'gaByUs',
        'physicalExamination',
        'examDate',
      ],
    });

    return res.status(200).send({ targetCurPreg, lastANC: targetANC });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMotherReport };
