const passport = require('passport');
const router = require('express').Router();
const { getMotherReport } = require('../controllers/motherReport');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.get('/getMotherReport/:id', authStaff, getMotherReport);

module.exports = router;
