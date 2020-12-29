const passport = require('passport');
const router = require('express').Router();
const { motherRegister, createCurrentPregnancy, motherFind } = require('../controllers/motherAccount');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.get('/motherFind', authStaff, motherFind);
router.post('/motherRegister', authStaff, motherRegister);
router.post('/createCurrentPregnancy', authStaff, createCurrentPregnancy);

module.exports = router;
