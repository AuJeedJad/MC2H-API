const db = require('../models');

const updateCorrectedEDC = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updateValue = {};

    for (let key in body) {
      if (body[key]) {
        updateValue[key] = body[key];
      }
    }

    if (!id) {
      return res.status(400).send({ message: 'Current Pregnancy Id not exist' });
    }

    const targetCurPreg = await db.CurrentPregnancy.findOne({ where: { id } });

    if (!targetCurPreg) {
      return res.status(404).send({ message: 'Current pregnancy id not found!' });
    }

    console.log(updateValue);

    await db.CurrentPregnancy.update(updateValue, { where: { id } });

    res.status(200).send({ message: 'Update corrected EDC success' });
  } catch (err) {
    next(err);
  }
};

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

    const targetANC = await db.ANC.findAll({
      where: { curPregId: id, isChecked: true },
      order: [['examDate', 'DESC']],
    });

    const physicalExamination = [];
    targetANC.forEach((ANC) => {
      if (ANC.physicalExamination !== null) {
        physicalExamination.push({ examDate: ANC.examDate, physicalExamination: ANC.physicalExamination });
      }
    });

    return res.status(200).send({ targetCurPreg, lastANC: targetANC[0], physicalExamination });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMotherReport, updateCorrectedEDC };
