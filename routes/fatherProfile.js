const router = require('express').Router();
const passport = require('passport');

const { getFather, updateFather } = require('../controllers/fatherProfile');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.get('/', authMother, getFather);
router.post('/', authMother, updateFather);

module.exports = router;
