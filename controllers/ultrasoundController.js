const fs = require('fs');
const db = require('../models');
const cloudinary = require('cloudinary').v2;

exports.addImages = (req, res, next) => {
  console.log(req.body.usResultId);
  const usResultId = JSON.parse(req.body.value);
  const files = req.files;

  files.forEach((item) => {
    cloudinary.uploader.upload(item.path, async (error, image) => {
      if (error) throw error;

      console.log(image);
      await db.UltrasoundImage.create({
        ultrasoundImage: image.secure_url,
        usResultId,
      });
      fs.unlinkSync(item.path);
    });
  });

  res.status(201).send({ message: 'successfully upload' });
};

exports.addNewUsResult = async (req, res, next) => {
  try {
    const ancId = JSON.parse(req.body.result).ancId;
    const targetAnc = await db.ANC.findOne({ where: { id: ancId } });
    if (!targetAnc) {
      return res.status(404).send({ message: 'ANC ID not found' });
    }
    const { BPD, FL, HC, AC, AFI, placenta, EFW, gestationalAge, note, risk, isCorrect, examBy } = JSON.parse(
      req.body.result
    );

    const newUsResult = await db.UltrasoundResult.create({
      BPD,
      FL,
      HC,
      AC,
      AFI,
      placenta,
      EFW,
      gestationalAge,
      note,
      risk,
      isCorrect,
      examBy,
      ancId,
    });

    const files = req.files;

    files.forEach((item) => {
      cloudinary.uploader.upload(item.path, async (error, image) => {
        if (error) throw error;

        console.log(image);
        await db.UltrasoundImage.create({
          ultrasoundImage: image.secure_url,
          usResultId: newUsResult.id,
        });
        fs.unlinkSync(item.path);
      });
    });
    res.status(201).send(newUsResult);
  } catch (err) {
    next(err);
  }
};
exports.editUsResult = async (req, res, next) => {
  try {
    const id = req.id;
    const { BPD, FL, HC, AC, AFI, placenta, EFW, gestationalAge, note, risk, isCorrect, examBy } = req.result;
  } catch (err) {
    next(err);
  }
};

exports.checkCorrectUs = async (req, res, next) => {
  try {
    const id = req.query.id;
    const targetCurrentPreg = await db.CurrentPregnancy.findOne({ where: { id } });
    if (!targetCurrentPreg) {
      return res.status(404).send({ message: 'pregnancy ID not found' });
    }
    if (targetCurrentPreg.dateByUltrasound) {
      return res
        .status(200)
        .send({ message: 'exist dateByUltrasound', dateByUltrasound: targetCurrentPreg.dateByUltrasound });
    } else {
      return res.status(200).send({ message: 'OK to set UltrasoundResult.isCorrect true' });
    }
  } catch (err) {
    next(err);
  }
};
