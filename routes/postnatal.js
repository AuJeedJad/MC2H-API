const router = require('express').Router();
const { fastTerminate } = require('../controllers/postnatal');

router.patch('/fastTerminate', fastTerminate);

module.exports = router;
