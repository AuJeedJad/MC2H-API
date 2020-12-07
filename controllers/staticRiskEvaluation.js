const db = require('../models');

const createStaticRiskEvaluation = async (req, res, next) => {
  try {
    const { checkList, type } = req.body;
    const newStaticRiskEvaluation = await db.StaticRiskEvaluation.create({
      checkList,
      type,
    });

    res.status(201).send(newStaticRiskEvaluation);
  } catch (err) {
    next(err);
  }
};

const getAllCheckLists = async (req, res, next) => {
  try {
    const { type } = req.query;
    let allCheckList = [];
    if (type) {
      allCheckLists = await db.StaticRiskEvaluation.findAll({ where: { type: type } });
    } else {
      allCheckLists = await db.StaticRiskEvaluation.findAll();
    }
    res.status(200).send(allCheckLists);
  } catch (err) {
    next(err);
  }
};

module.exports = { createStaticRiskEvaluation, getAllCheckLists };
