const router = require('express').Router();
const passport = require('passport');
const { recordDownsyndrome, recordCoupleCounsel, recordParentSchool } = require('../controllers/currentPregnancy');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/pregnantHistory', authStaff, recordWeightAndHeightOfMother);
router.post('/downsyndrome', authStaff, recordDownsyndrome);
router.post('/coupleCounsel', authStaff, recordCoupleCounsel);
router.post('/parentSchool', authStaff, recordParentSchool);

module.exports = router;
