const router = require('express').Router();
const passport = require('passport');
const { createVaccine } = require('../controllers/vaccine');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/', authStaff, createVaccine);

module.exports = router;
