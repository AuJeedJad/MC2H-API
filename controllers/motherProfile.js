const db = require('../models');
const bcryptjs = require('bcryptjs');

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
      return res.status(200).send(motherProfiles);
    } else {
      return res.status(404).send({ message: 'id not found!' });
    }
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
      road,
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
    console.log(targetMother.id);
    if (!targetAddress) {
      const newAddress = await db.MotherAddress.create({
        address,
        road,
        subDistrict,
        district,
        province,
        zipCode,
        motherId: targetMother.id,
      });
      return res.status(201).send(newAddress);
    } else {
      await targetAddress.update({ address, road, subDistrict, district, province, zipCode });
    }

    return res.status(200).send({ mother: targetMother, address: targetAddress });
  } catch (err) {
    next(err);
  }
};

const changePasswordMother = async (req, res, next) => {
  try {
    const { idCard } = req.body;
    const targetUser = await db.MotherProfile.findOne({ where: { idCard } });
    if (targetUser) {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcryptjs.hashSync(idCard, salt);
      await targetUser.update({ password: hashedPassword });
      res.status(200).send({ message: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว' });
    } else {
      res.status(400).send({ message: 'ไม่มี MotherProfile นี้ในระบบ' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMotherProfile,
  updateMotherProfile,
  changePasswordMother,
};
