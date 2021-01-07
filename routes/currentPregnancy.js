const router = require('express').Router();
const passport = require('passport');
const {
  recordWeightAndHeightOfMother,
  recordDownsyndrome,
  recordCoupleCounselAndParentSchool,
  updateNote,
  getCurrentPregnancy,
  getCurrentPregnancy1,
} = require('../controllers/currentPregnancy');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/pregnantHistory', authStaff, recordWeightAndHeightOfMother);
router.post('/downsyndrome', authStaff, recordDownsyndrome);
router.post('/coupleCounselAndParentSchool', authStaff, recordCoupleCounselAndParentSchool);

router.patch('/note/:id', updateNote);
router.get('/:id', getCurrentPregnancy);
// router.get('/', getCurrentPregnancy1);

module.exports = router;
