const router = require('express').Router();
const passport = require('passport');
const { getMotherProfile, updateMotherProfile } = require('../controllers/motherProfile');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.get('/', authMother, getMotherProfile);
router.post('/', authMother, updateMotherProfile);

module.exports = router;
