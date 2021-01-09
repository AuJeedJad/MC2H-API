const router = require('express').Router();
const passport = require('passport');
const { recordLabResult, readAllLabResult, readLabResultById } = require('../controllers/labResult');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/', authStaff, recordLabResult);
router.get('/byCurPreg/:id', authStaff, readAllLabResult);
router.get('/:id', authStaff, readLabResultById);

module.exports = router;
