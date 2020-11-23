const router = require('express').Router();
const passport = require('passport');
const { login, motherRegister, createCurrentPregnancy } = require('../controllers/staff');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.post('/login', login);
router.post('/motherRegister', authStaff, motherRegister);
router.post('/createCurrentPregnancy', authStaff, createCurrentPregnancy);

module.exports = router;
