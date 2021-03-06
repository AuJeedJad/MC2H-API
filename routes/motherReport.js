const passport = require('passport');
const router = require('express').Router();
const { getMotherReport, updateCorrectedEDC } = require('../controllers/motherReport');

const authStaff = passport.authenticate('jwt-staff', { session: false });

router.get('/getMotherReport/:id', authStaff, getMotherReport);
router.patch('/updateCorrectedEDC/:id', authStaff, updateCorrectedEDC);

module.exports = router;
