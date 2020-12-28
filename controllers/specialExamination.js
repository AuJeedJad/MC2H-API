const db = require('../models');

const getCorrectSpecialExamination = async (req, res, next) => {
  try {
    const { curPregId } = req.query;
    const currentPregnancy = await db.CurrentPregnancy.findOne({
      where: {
        id: curPregId,
      },
    });

    const ancs = await db.ANC.findAll({
      where: { curPregId: curPregId },
    });

    const anc = ancs.length > 0 ? ancs.length - 1 : null;

    const specialExamination = await db.SpecialExamination.findAll({
      where: {
        ancId: anc.id,
      },
    });
    res.status(200).send({ specialExamination: specialExamination })
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getCorrectSpecialExamination,
}
