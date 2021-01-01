const db = require('../models');

const getCorrectUltrasoundResult = async (req, res, next) => {
  try {
    const { curPregId } = req.query;
    const currentPregnancy = await db.CurrentPregnancy.findOne({
      where: {
        id: curPregId,
      },
      //   include: {
      //     model: db.ANC,
      //     attributes: ['id'],
      //   },
    });

    const ancs = await db.ANC.findAll({
      where: { curPregId: curPregId },
      attributes: ['id'],
    });

    const ancIds = ancs.map((anc) => anc.id);

    const ultrasoundResults = await db.UltrasoundResult.findAll({
      where: {
        ancId: ancIds,
      },
    });
    const ultrasoundResult = ultrasoundResults.filter((ur) => ur.isCorrect);

    res.status(200).send({ ultrasoundResult: ultrasoundResult.length > 0 ? ultrasoundResult[0] : {} });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCorrectUltrasoundResult,
};
