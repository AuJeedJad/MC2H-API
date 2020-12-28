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

    const anc = ancs.length > 0 ? ancs[ancs.length - 1] : null;

    const specialExamination = await db.SpecialExamination.findAll({
      where: {
        ancId: anc.id,
      },
    });
    res.status(200).send({ specialExamination: specialExamination });
  } catch (err) {
    next(err);
  }
};

const createSpecialExamination = async (req, res, next) => {
  const { exam, curPregId } = req.body;
  const ancs = await db.ANC.findAll({
    where: { curPregId: curPregId },
  });

  const anc = ancs.length > 0 ? ancs[ancs.length - 1] : null;
  if (!anc) {
    return res.status(400).send({ message: 'ANC Not Found' });
  }

  const input = [
    {
      examination: exam[0].examination,
      result: exam[0].result,
      examDate: anc.examDate,
      ancId: anc.id,
    },
    {
      examination: exam[1].examination,
      result: exam[1].result,
      examDate: anc.examDate,
      ancId: anc.id,
    },
  ];

  anc.nippleExam = exam[2].result;
  await anc.save();

  const specialExamination = await db.SpecialExamination.bulkCreate(input);
  res.status(201).send({ message: 'SpecialExamination Creted' });
};

module.exports = {
  getCorrectSpecialExamination,
  createSpecialExamination,
};
