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
      include: {
        model: db.ANC,
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
      },
    });

    if (!targetCurPreg) {
      return res.status(404).send({ message: 'Current Pregnancy Id not found' });
    }

    let lastANC;
    if (targetCurPreg.ANCs.length) {
      lastANC = targetCurPreg.ANCs[targetCurPreg.ANCs.length - 1];
    }

    return res.status(200).send({ targetCurPreg, lastANC });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMotherReport };
