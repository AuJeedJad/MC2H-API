const router = require('express').Router();
const passport = require('passport');
const { getMotherProfile, updateMotherProfile, changePasswordMother } = require('../controllers/motherProfile');

const authMother = passport.authenticate('jwt-mother', { session: false });
const authStaff = passport.authenticate('jwt-staff', { session: false });

router.get('/', authMother, getMotherProfile);
router.post('/', authMother, updateMotherProfile);
router.patch('/', authStaff, changePasswordMother);

module.exports = router;
