const db = require('../models');

const updateNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    const currentPregId = req.params.id;
    await db.CurrentPregnancy.update(
      {
        note: note,
      },
      {
        where: {
          id: currentPregId,
        },
      }
    );
    res.status(200).send({ message: 'updated successful' });
  } catch (err) {
    next(err);
  }
};

const getCurrentPregnancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentPregnancy = await db.CurrentPregnancy.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send({ currentPregnancy: currentPregnancy });
  } catch (err) {
    next(err);
  }
};

// const getCurrentPregnancy1 = async (req, res, next) => {
//   try {
//     // การทำ Detructjerring
//     const { id } = req.query;
//     // การตั้งชื่อให้รู้ว่าดึงจากตารางอะไร
//     const currentPregnancy = await db.CurrentPregnancy.findOne({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).send({ currentPregnancy: currentPregnancy });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  updateNote,
  getCurrentPregnancy,
  // getCurrentPregnancy1,
};
