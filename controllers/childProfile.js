const db = require('../models');

const getChild = async (req, res, next) => {
  try {
    const { curPregId } = req.query;
    const targetPregHistory = await db.PregnantHistory.findOne({
      where: { curPregId },
      include: [
        {
          model: db.Child,
        },
      ],
    });

    if (!targetPregHistory) {
      return res.status(400).send({ message: 'Not Found !' });
    }

    const targetChild = await db.Child.findOne({
      where: targetPregHistory.Children.id,
    });

    return res.status(200).send(targetChild);
  } catch (err) {
    next(err);
  }
};

const updateChild = async (req, res, next) => {
  try {
    const { curPregId, firstName, lastName, birthDate, idCard } = req.body;

    const targetPregHistory = await db.PregnantHistory.findOne({
      where: { curPregId },
      include: [
        {
          model: db.Child,
        },
      ],
    });

    const targetChild = await db.Child.findOne({ where: { pregHistoryId: targetPregHistory.id } });

    if (!targetChild) {
      const newChild = await targetChild.create({
        firstName,
        lastName,
        idCard,
        birthDate,
        email,
        phoneNumber,
        pregHistoryId: targetPregHistory.id,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      });
      return res.status(201).send(newChild);
    } else {
      await targetChild.update({ firstName, lastName, birthDate, idCard, updatedAt: new Date().toLocaleString() });
    }

    return res.status(200).send(targetChild);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getChild,
  updateChild,
};
