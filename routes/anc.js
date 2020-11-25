const passport = require('passport');
const router = require('express').Router();
const { getAnc } = require('../controllers/anc');

router.get('/', getAnc);

module.exports = router;
