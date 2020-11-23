const passport = require('passport');
const router = require('express').Router();
const { getMotherProfile } = require('../controllers/motherProfile');

const authStaff = passport.authenticate('jwt-auth-staff', { session: false });

router.get('/', authStaff, getMotherProfile);

module.exports = router;
