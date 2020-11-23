const getMotherProfile = async (req, res) => {
  try {
    const idCard = req.query.idCard;
    const motherProfiles = await db.MotherProfile.findAll({
      where: {
        idCard: {
          [Op.substring]: idCard,
        },
      },
      // attributes: ['idCard']
    });
    res.status(200).send({ motherProfiles });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMotherProfile,
};
