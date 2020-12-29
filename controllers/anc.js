const db = require('../models');
const { Op, where } = require('sequelize');

const getAnc = async (req, res, next) => {
  try {
    const { appointmentDate, checkHospitalId, idCard, curPregId, isChecked } = req.query;

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

    if (+isChecked) {
      query = { ...query, where: { ...query.where, isChecked } };
    }

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

    const ancs = await db.ANC.findAll(query);

    res.status(200).send({ ancs, count: ancs.length });
  } catch (err) {
    next(err);
  }
};

const createAnc = async (req, res, next) => {
  try {
    const { idCard, checkHospitalId } = req.body;

    if (!idCard) return res.status(400).send({ message: 'Id card is required' });
    if (!checkHospitalId) return res.status(400).send({ message: 'Check hospital id is required' });

    const motherProfile = await db.MotherProfile.findOne({
      where: {
        idCard,
      },
    });

    if (!motherProfile) return res.status(400).send({ message: 'Mother not found' });

    const activeCurrentPregnancy = await db.CurrentPregnancy.findOne({
      where: {
        motherId: motherProfile.id,
        inactiveDate: { [Op.gte]: new Date() },
      },
    });

    if (!activeCurrentPregnancy) return res.status(400).send({ message: 'None active current pregnancy' });

    const anc = await db.ANC.create({
      appointmentDate: new Date(),
      examDate: new Date(),
      curPregId: activeCurrentPregnancy.id,
      checkHospitalId,
      nextHospitalId: checkHospitalId,
    });

    if (activeCurrentPregnancy) res.status(201).send({ message: 'Anc is created', anc, motherProfile });
  } catch (err) {
    next(err);
  }
};

const updateAnc = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anc = await db.ANC.findOne({
      where: {
        id,
      },
    });
    if (!anc) {
      return res.status(400).send({ message: 'ANC Not found' });
    }
    await db.ANC.update(
      { ...req.body, isChecked: true },
      {
        where: {
          id,
        },
      }
    );
    return res.status(200).send({ message: 'ANC update' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAnc,
  createAnc,
  updateAnc,
};
