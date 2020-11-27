const router = require('express').Router();
const passport = require('passport');
const { recordLabResult } = require('../controllers/labResult');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/', authStaff, recordLabResult);

module.exports = router;
