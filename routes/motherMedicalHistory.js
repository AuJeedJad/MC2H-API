const router = require('express').Router();
const passport = require('passport');
const { getMedicalHistory, getPregnantHistory } = require('../controllers/motherMedicalHistory');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.get('/medicalHistory', authMother, getMedicalHistory);
router.get('/pregnantHistory', authMother, getPregnantHistory);

module.exports = router;
