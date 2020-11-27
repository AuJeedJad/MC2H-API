const router = require('express').Router();
const passport = require('passport');
const { recordVaccine } = require('../controllers/vaccine');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/', authStaff, recordVaccine);

module.exports = router;
