const router = require('express').Router();
const { getCorrectUltrasoundResult } = require('../controllers/ultrasoundResult');

router.get('/', getCorrectUltrasoundResult);

module.exports = router;
