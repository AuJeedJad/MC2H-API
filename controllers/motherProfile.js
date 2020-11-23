const db = require('../models');
const { Op } = require('sequelize');
const getMotherProfile = async (req, res, next) => {
  try {
    const idCard = req.query.idCard;
    let motherProfiles = [];

    if (idCard) {
      motherProfiles = await db.MotherProfile.findAll({
        where: {
          idCard: {
            [Op.substring]: idCard,
          },
        },
        // attributes: ['idCard']
      });
    } else {
      motherProfiles = await db.MotherProfile.findAll({});
    }
    res.status(200).send({ motherProfiles });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMotherProfile,
};
