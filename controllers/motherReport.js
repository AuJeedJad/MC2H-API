const db = require('../models');

const getMotherReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).send({ message: 'Current Pregnancy Id not exist' });
    }

    const targetPreg = await db.CurrentPregnancy.findOne({
      where: { id },
      attributes: [
        'correctedBy',
        'dateByLMP',
        'dateByUltrasound',
        'dateByPV',
        'dateByUtSize',
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

    return res.status(200).send(targetPreg);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMotherReport };
