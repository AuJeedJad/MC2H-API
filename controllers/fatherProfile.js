const db = require('../models');

const getFather = async (req, res, next) => {
  try {
    const { curPregId } = req.query;
    const targetCurPreg = await db.CurrentPregnancy.findOne({
      where: curPregId,
      include: [
        {
          model: db.FatherProfile,
        },
      ],
    });

    if (!targetCurPreg) {
      return res.status(400).send({ message: 'Invalid !' });
    }

    return res.status(200).send(targetCurPreg.FatherProfile);
  } catch (err) {
    next(err);
  }
};

const updateFather = async (req, res, next) => {
  try {
    const { id, firstName, lastName, idCard, birthDate, email, phoneNumber } = req.body;
    const targetFather = await db.FatherProfile.findOne({ where: id });

    if (!targetFather) {
      const newFather = await targetFather.create({ firstName, lastName, idCard, birthDate, email, phoneNumber });
      return res.status(201).send(newFather);
    } else {
      await targetFather.update({ firstName, lastName, idCard, birthDate, email, phoneNumber });
    }

    return res.status(200).send(targetFather);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFather,
  updateFather,
};
