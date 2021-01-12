const router = require('express').Router();
const passport = require('passport');
const {
  recordPregnancyHistoryOfMother,
  recordDownsyndrome,
  recordCoupleCounselAndParentSchool,
  updateNote,
  getCurrentPregnancy,
} = require('../controllers/currentPregnancy');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/pregnantHistory', authStaff, recordPregnancyHistoryOfMother);
router.post('/downsyndrome', authStaff, recordDownsyndrome);
router.post('/coupleCounselAndParentSchool', authStaff, recordCoupleCounselAndParentSchool);

router.patch('/note/:id', updateNote);
router.get('/:id', getCurrentPregnancy);
// router.get('/', getCurrentPregnancy1);

module.exports = router;
