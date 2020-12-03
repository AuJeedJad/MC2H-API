const router = require('express').Router();
const passport = require('passport');

const { findFather } = require('../controllers/fatherProfile');

const authMother = passport.authenticate('jwt-mother', { session: false });

router.get('/', authMother, findFather);

module.exports = router;
