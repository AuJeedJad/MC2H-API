const db = require('../models');

const createRiskEvaluation = async (req, res, next) => {
  try {
    const { history, curPregId, examBy, present, medicine } = req.body;
    let result = [];
    for (let i = 0; i < history.length; i++) {
      result.push({
        staticRiskEvaId: history[i].id,
        curPregId: curPregId,
        isCheck: history[i].isCheck,
        examBy: examBy,
        date: new Date(),
      });
    }

    for (let i = 0; i < present.length; i++) {
      for (let j = 0; j < present[i].length; j++) {
        result.push({
          staticRiskEvaId: present[i][j].id,
          curPregId: curPregId,
          isCheck: present[i][j].isCheck,
          examBy: examBy,
          date: new Date(),
        });
      }
    }

    for (let i = 0; i < medicine.length; i++) {
      for (let j = 0; j < medicine[i].length; j++) {
        result.push({
          staticRiskEvaId: medicine[i][j].id,
          curPregId: curPregId,
          isCheck: medicine[i][j].isCheck,
          examBy: examBy,
          date: new Date(),
        });
      }
    }

    const newHistory = await db.RiskEvaluation.bulkCreate(result);

    res.status(200).send({ message: 'createRisk is completed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createRiskEvaluation };
