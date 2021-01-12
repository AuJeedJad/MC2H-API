const router = require('express').Router();
const passport = require('passport');
const { fastTerminate, terminate } = require('../controllers/postnatal');

const authStaff = passport.authenticate('jwt-staff', { session: false });
router.patch('/fastTerminate', authStaff, fastTerminate);
router.patch('/terminate', authStaff, terminate);

module.exports = router;
