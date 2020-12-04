const router = require('express').Router();
<<<<<<< HEAD
const passport = require('passport');
const {
  recordWeightAndHeightOfMother,
  recordDownsyndrome,
  recordCoupleCounsel,
  recordParentSchool,
} = require('../controllers/currentPregnancy');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/pregnantHistory', authStaff, recordWeightAndHeightOfMother);
router.post('/downsyndrome', authStaff, recordDownsyndrome);
router.post('/coupleCounsel', authStaff, recordCoupleCounsel);
router.post('/parentSchool', authStaff, recordParentSchool);
=======
const { updateNote, getCurrentPregnancy, getCurrentPregnancy1 } = require('../controllers/currentPregnancy');

router.patch('/note/:id', updateNote);
router.get('/:id', getCurrentPregnancy);
// router.get('/', getCurrentPregnancy1);
>>>>>>> dev

module.exports = router;
