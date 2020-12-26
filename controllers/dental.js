const db = require('../models');

const DentalCare = async (req, res, next) => {
  try {
    const { dental, dentalExamId } = req.body;
    let resultCare = {
      dentalExamId: dentalExamId,
      isMouthCare: dental.isMouthCare,
      isBrushPractice: dental.isBrushPractice,
      isDryedBrush: dental.isDryedBrush,
      isFloss: dental.isFloss,
      other: dental.other,
    };
    const newDental = await db.DentalCare.create(resultCare);

    res.status(200).send({ message: 'createDentalCare is completed', newDental });
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

    res.status(200).send({ message: 'createDentalAppointment is completed', newDentalAppointment });
  } catch (err) {
    next(err);
  }
};

const DentalExam = async (req, res, next) => {
  try {
    const { dentalCheck, curPregId } = req.body;
    let resultExam = {
      curPregId: curPregId,
      toothDecay: dentalCheck.toothDecay,
      calculus: dentalCheck.calculus,
      gingivitis: dentalCheck.gingivitis,
      other: dentalCheck.other,
      examBy: dentalCheck.examBy,
    };
    const newDentalCheck = await db.DentalExam.create(resultExam);

    res.status(200).send({ message: 'createDentalExam is completed', newDentalCheck });
  } catch (err) {
    next(err);
  }
};

module.exports = { DentalCare, DentalAppointment, DentalExam };
