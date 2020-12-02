const db = require('../models');
const { Op } = require('sequelize');

const getAnc = async (req, res, next) => {
  try {
    const { appointmentDate, checkHospitalId, idCard, curPregId } = req.query;

    let query = {
      include: {
        model: db.CurrentPregnancy,
        required: true,
        include: {
          model: db.MotherProfile,
          required: true,
        },
      },
    };

    if (appointmentDate) {
      query = { ...query, where: { ...query.where, appointmentDate } };
    }

    // {
    //   where: {
    //     appointmentDate;
    //   }
    // }

    if (checkHospitalId) {
      query = { ...query, where: { ...query.where, checkHospitalId } };
    }

    // {
    //   where: {
    //     appointmentDate, checkHospitalId;
    //   }
    // }

    if (curPregId) {
      query = { ...query, where: { ...query.where, curPregId } };
    }

    if (idCard) {
      query = {
        ...query,
        include: {
          ...query.include,
          include: {
            ...query.include.include,
            where: {
              idCard: {
                [Op.substring]: idCard,
              },
            },
          },
        },
      };
    }

    const ANC = await db.ANC.findAll(query);

    res.status(200).send({ ANC, count: ANC.length });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnc,
};
