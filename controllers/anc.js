const db = require('../models');

const getAnc = async (req, res, next) => {
  try {
    const appointmentDate = req.query.appointmentDate;
    const checkHospitalId = req.query.checkHospitalId;

    let ANC = [];

    if (appointmentDate && checkHospitalId) {
      ANC = await db.ANC.findAll({
        where: { appointmentDate, checkHospitalId },
        include: [
          {
            model: db.CurrentPregnancy,
            attributes: ['motherId'],
            include: [
              {
                model: db.MotherProfile,
                attributes: ['firstName', 'lastName'],
              },
            ],
          },
        ],
        attributes: ['checkHospitalId'],
      });
    } else {
      ANC = await db.ANC.findAll({
        include: [
          {
            model: db.CurrentPregnancy,
            attributes: ['motherId'],
            include: [
              {
                model: db.MotherProfile,
                attributes: ['firstName', 'lastName'],
              },
            ],
          },
        ],
        attributes: ['examDate', 'appointmentDate', 'examBy'],
      });
    }
    res.status(200).send({ ANC });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnc,
};
