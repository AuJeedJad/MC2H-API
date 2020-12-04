const db = require('../models');

const findFather = async (req, res, next) => {
  try {
    const { curPregId } = req.query;
    const targetCurPreg = await db.CurrentPregnancy.findOne({ where: curPregId });
    const targetFather = await db.FatherProfile.findOne({ where: targetCurPreg.id });

    if (!targetFather) {
      return res.status(400).send({ message: 'invalid' });
    }

    return res.status(200).send(targetFather);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findFather,
};
