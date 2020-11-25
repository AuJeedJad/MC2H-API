const db = require('../models');

const DentalCare = async (req, res, next) => {
  try {
    const { dental, dentalExamId } = req.body;
    let resultCare = [];
    for (i = 0; i < dental.length; i++) {
      resultCare.push({
        dentalExamId: dentalExamId,
        isMouthCare: dental[i].isMouthCare,
        isBrushPractice: dental[i].isBrushPractice,
        isDryedBrush: dental[i].isDryedBrush,
        isFloss: dental[i].isFloss,
        other: dental[i].other,
      });
    }

    const newDental = await db.DentalCare.bulkCreate(resultCare);

    res.status(200).send({ message: 'createDentalCare is completed' });
  } catch (err) {
    next(err);
  }
};

const DentalAppointment = async (req, res, next) => {
  try {
    const { dentalAppoint, dentalExamId } = req.body;
    let resultAppointment = [];
    for (i = 0; i < dentalAppoint.length; i++) {
      resultAppointment.push({
        dentalExamId: dentalExamId,
        date: new Date(dentalAppoint[i].date),
        dentist: dentalAppoint[i].dentist,
        details: dentalAppoint[i].details,
      });
    }

    const newDentalAppointment = await db.DentalAppointment.bulkCreate(resultAppointment);

    res.status(200).send({ message: 'createDentalAppointment is completed' });
  } catch (err) {
    next(err);
  }
};

const DentalExam = async (req, res, next) => {
  try {
    const { dentalCheck, curPregId } = req.body;
    let resultExam = [];
    for (i = 0; i < dentalCheck.length; i++) {
      resultExam.push({
        curPregId: curPregId,
        toothDecay: dentalCheck[i].toothDecay,
        calculus: dentalCheck[i].calculus,
        gingivitis: dentalCheck[i].gingivitis,
        other: dentalCheck[i].other,
        examBy: dentalCheck[i].examBy,
      });
    }

    const newDentalCheck = await db.DentalExam.bulkCreate(resultExam);

    res.status(200).send({ message: 'createDentalExam is completed' });
  } catch (err) {
    next(err);
  }
};

module.exports = { DentalCare, DentalAppointment, DentalExam };
