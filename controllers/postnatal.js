const db = require('../models');

const fastTerminate = async (req, res, next) => {
  try {
    let { id, terminateDate, terminateAt } = req.body;

    if (!terminateDate) {
      return res.status(400).send({ message: 'ต้องกรอกวันสิ้นสุดการตั้งครรภ์' });
    }

    if (new Date(terminateDate) > new Date()) {
      return res.status(400).send({ message: 'ต้องสิ้นสุดการตั้งครรภ์ก่อนวันนี้' });
    }

    if (!terminateAt && terminateDate) {
      terminateAt = 'บ้าน';
    }

    const targetCurPreg = await db.CurrentPregnancy.findOne({ where: { id } });

    if (!targetCurPreg) {
      return res.status(404).send({ message: 'ไม่พบข้อมูลการตั้งครรภ์นี้' });
    }

    const motherId = targetCurPreg.motherId;
    targetCurPreg.giveBirthAt = terminateAt;
    targetCurPreg.inactiveDate = terminateDate;
    await targetCurPreg.save();

    const targetMother = await db.MotherProfile.findOne({ where: { id: motherId } });
    targetMother.isActive = false;
    await targetMother.save();

    res.status(200).send({ message: 'success' });
  } catch (err) {
    next(err);
  }
};
const terminate = async (req, res, next) => {
  try {
    let { id, terminateAt } = req.body;

    const targetCurPreg = await db.CurrentPregnancy.findOne({ where: { id } });

    if (!targetCurPreg) {
      return res.status(404).send({ message: 'ไม่พบข้อมูลการตั้งครรภ์นี้' });
    }

    targetCurPreg.giveBirthAt = terminateAt;
    targetCurPreg.inactiveDate =
      new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + new Date().getDate();
    await targetCurPreg.save();

    //logicนี้จะต้องแก้หากคิดพํฒนาหลังคลอดต่อ
    const motherId = targetCurPreg.motherId;
    const targetMother = await db.MotherProfile.findOne({ where: { id: motherId } });
    targetMother.isActive = false;
    await targetMother.save();

    res.status(200).send({ message: 'success' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fastTerminate,
  terminate,
};
