const db = require('../models');

const getMotherProfile = async (req, res, next) => {
  try {
    const { id } = req.query;
    let motherProfiles;

    if (id) {
      motherProfiles = await db.MotherProfile.findOne({
        where: {
          id,
        },
        include: [
          {
            model: db.MotherAddress,
          },
        ],
      });
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
    return res.status(200).send(motherProfiles);
  } catch (err) {
    next(err);
  }
};

const updateMotherProfile = async (req, res, next) => {
  try {
    const {
      id,
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      address,
      subDistrict,
      district,
      province,
      zipCode,
    } = req.body;

    const targetMother = await db.MotherProfile.findOne({ where: id });
    if (!targetMother) {
      return res.status(400).send({ message: 'ไม่มีผู้ใช้ในระบบ' });
    } else {
      await targetMother.update({ firstName, lastName, birthDate, email, phoneNumber });
    }

    const targetAddress = await db.MotherAddress.findOne({ where: targetMother.id });
    if (!targetAddress) {
      const newAddress = await db.MotherAddress.create({
        address,
        subDistrict,
        district,
        province,
        zipCode,
        motherId: targetMother.id,
      });
      return res.status(201).send(newAddress);
    } else {
      await targetAddress.update({ address, subDistrict, district, province, zipCode });
    }

    return res.status(200).send({ mother: targetMother, address: targetAddress });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMotherProfile,
  updateMotherProfile,
};
