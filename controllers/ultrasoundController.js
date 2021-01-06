const fs = require('fs');
const db = require('../models');
const cloudinary = require('cloudinary').v2;

const util = require('util');

const uploadCloud = util.promisify(cloudinary.uploader.upload);

exports.addImages = async (req, res, next) => {
  // console.log(req.body.usResultId);
  const usResultId = JSON.parse(req.body.value);
  const files = req.files;
  // console.log(files);

  const targetUsResult = await db.UltrasoundResult.findOne({ where: { id: usResultId } });
  if (!targetUsResult) {
    return res.status(400).send({ message: 'Ultrasound result id not found.' });
  }

  // files.forEach((item) => {
  //   cloudinary.uploader.upload(item.path, async (error, image) => {
  //     if (error) throw error;

  //     // console.log(image);
  //     await db.UltrasoundImage.create({
  //       ultrasoundImage: image.secure_url,
  //       usResultId,
  //     });
  //     console.log('uploaded', new Date());
  //     fs.unlinkSync(item.path);
  //   });
  // });

  for (let i = 0; i < files.length; i++) {
    const uploaded = await uploadCloud(files[i].path);
    await db.UltrasoundImage.create({
      ultrasoundImage: uploaded.secure_url,
      usResultId,
    });
  }

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

    // files.forEach((item) => {
    //   cloudinary.uploader.upload(item.path, async (error, image) => {
    //     if (error) throw error;

    //     console.log(image);
    //     await db.UltrasoundImage.create({
    //       ultrasoundImage: image.secure_url,
    //       usResultId: newUsResult.id,
    //     });
    //     fs.unlinkSync(item.path);
    //   });
    // });

    for (let i = 0; i < files.length; i++) {
      const uploaded = await uploadCloud(files[i].path);
      await db.UltrasoundImage.create({
        ultrasoundImage: uploaded.secure_url,
        usResultId: newUsResult.id,
      });
    }

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

exports.getUltarsoundResult = async (req, res, next) => {
  try {
    const { ancId } = req.query;
    const targetANC = await db.UltrasoundResult.findAll({
      where: { ancId },
      include: { model: db.UltrasoundImage, attributes: ['ultrasoundImage'] },
    });

    if (!targetANC) {
      return res.status(400).send({ message: 'Anc Id not found.' });
    }

    const newTargetANC = [];

    targetANC.forEach((item) => {
      const image = item.UltrasoundImages.map((obj) => obj.ultrasoundImage);
      const value = [];
      for (let key in item.dataValues) {
        if (key === 'id' || key === 'UltrasoundImages') continue;
        value.push({ name: key, value: item[key] });
      }
      newTargetANC.push({ id: item.id, value, image });
    });

    res.status(200).send(newTargetANC);
  } catch (err) {
    next(err);
  }
};
