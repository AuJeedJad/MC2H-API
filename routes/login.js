const passport = require('passport');
const router = require('express').Router();
const { motherLogin, staffLogin } = require('../controllers/login');

router.post('/mother', motherLogin);
router.post('/staff', staffLogin);

module.exports = router;
