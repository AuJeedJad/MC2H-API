const router = require('express').Router();
const passport = require('passport');
const { recordVaccine, readVaccineByCurPregId } = require('../controllers/vaccine');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/', authStaff, recordVaccine);
router.get('/:id', authStaff, readVaccineByCurPregId);

module.exports = router;
