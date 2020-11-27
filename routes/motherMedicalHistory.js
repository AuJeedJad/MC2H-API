const passport = require('passport');
const router = require('express').Router();
const { getMedicalHistory, getPregnantHistory } = require('../controllers/motherMedicalHistory');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.post('/', authMother, getMedicalHistory);
router.post('/pregnantHistory', authMother, getPregnantHistory);

module.exports = router;
